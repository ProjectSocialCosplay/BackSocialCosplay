const {AuthenticationError} = 'apollo-server-express'

export default {

    Mutation: {
        createLike: async (parent, {postId}, { models: { likeModel, postModel, userModel } , userInfo}, info) => {

            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const like = await new likeModel({ author: userInfo._id, post: postId }).save();

            // Push like to post collection
            await postModel.findOneAndUpdate({ _id: postId }, { $push: { likes: like.id } })

            // Push like to user collection
            await userModel.findOneAndUpdate({ _id: userInfo._id }, { $push: { likes: like.id } });

            return like;
        },

        deleteLike: async (parent, { postId }, { models: { likeModel, postModel, userModel } , userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const beforeDeleteLike =  await likeModel.findOneAndRemove({author:userInfo._id, post:postId});
            if(beforeDeleteLike){
                // Delete like from users collection
                await userModel.findOneAndUpdate({ _id: beforeDeleteLike.author }, { $pull: { likes: beforeDeleteLike.id } });
                // Delete like from posts collection
                await postModel.findOneAndUpdate({ _id: beforeDeleteLike.post }, { $pull: { likes: beforeDeleteLike.id } });
                return beforeDeleteLike
            }else{
                throw new Error( 'internal server error');
            }
        },
    },
    Like: {
        author: async (parent, arg, {models: {userModel}, userInfo}, info) => {
            return await userModel.findOne({_id: parent.author}).exec()
        },
        post : async (parent, arg, {models: {postModel}}, info) => {
            return await postModel.findOne({_id: parent.post}).exec()
        },
    },
};