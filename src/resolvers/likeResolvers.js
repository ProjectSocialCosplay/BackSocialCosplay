import {AuthenticationError} from 'apollo-server-express'

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
            const like = await likeModel.findByIdAndRemove(postId);

            // Delete like from users collection
            await userModel.findOneAndUpdate({ _id: like.author }, { $pull: { likes: like.id } });
            // Delete like from posts collection
            await postModel.findOneAndUpdate({ _id: like.post }, { $pull: { likes: like.id } });
            return {message: 'Like successfully deleted.'};
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