import {AuthenticationError} from 'apollo-server';

export default {
    Query: {
        getAuthUserlike: async (parent, {id}, {models: {likeModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await likeModel.find({author: id}).exec()
        },
        getPostLike: async (parent, args, {models: {likeModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await likeModel.find({author: userInfo._id}).exec();
        },
    },

    Mutation: {

        Like: async (root, {input: {userId, postId}}, {Like, Post, User},userInfo) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const like = await new Like({user: userId, post: postId}).save();

            // Push like to post collection
            await Post.findOneAndUpdate({_id: like.post}, {$push: {likes: like.id}});
            // Push like to user collection
            await User.findOneAndUpdate({_id: like.user}, {$push: {likes: like.id}});
            return like;
        },

        unLike: async (root, {input: {id}}, {Like, User, Post},userInfo) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const like = await Like.findByIdAndRemove(id);

            await User.findOneAndUpdate({_id: like.user}, {$pull: {likes: like.id}});

            await Post.findOneAndUpdate({_id: like.post}, {$pull: {likes: like.id}});

            return like;
        },
    },

    Like: {
        author: async ({author}, args, {models: {userModel}}, info) => {
            return await userModel.findById({_id: author}).exec();
        },
    },
};