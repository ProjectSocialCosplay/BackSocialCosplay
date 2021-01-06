import {AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        like: async (parent, { id }, { models: { likeModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await likeModel.find({author: id}).exec()
        },
        likes: async (parent, args, { models: { likeModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await likeModel.find({author: me._id}).exec();
        },

    },

    Mutation: {

        createLike: async (root, { input: { userId, postId } }, { Like, Post, User }) => {
        const like = await new Like({ user: userId, post: postId }).save();
    
        // Push like to post collection
        await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: like.id } });
        // Push like to user collection
        await User.findOneAndUpdate({ _id: userId }, { $push: { likes: like.id } });
    
        return like;
        },

        deleteLike: async (root, { input: { id } }, { Like, User, Post }) => {
        const like = await Like.findByIdAndRemove(id);
    
        // Delete like from users collection
        await User.findOneAndUpdate({ _id: like.user }, { $pull: { likes: like.id } });
        // Delete like from posts collection
        await Post.findOneAndUpdate({ _id: like.post }, { $pull: { likes: like.id } });
    
        return like;
        },
    },
    Like: {
        author: async ({ author }, args, { models: { userModel } }, info) => {
            return await userModel.findById({_id: author}).exec();
        },
    },
};