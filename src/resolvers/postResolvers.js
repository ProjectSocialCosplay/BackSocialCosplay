import {AuthenticationError} from 'apollo-server';

export default {
    Query: {
        post: async (parent, { id }, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await postModel.find({author: id}).exec()
        },
        posts: async (parent, args, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await postModel.find({author: userInfo._id}).exec();
        },
    },
    Mutation: {
        createPost: async (parent, { content }, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await postModel.create({content, author: userInfo._id});
        },

        deletePost: async (parent, { id }, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            //Remove Image From Azure
            //Remove  Post
            //remove comments
            // Find user notification in users collection and remove them
        },
    },

    Post: {
        author: async ({ author }, args, { models: { userModel } }, info) => {
            return await userModel.findById({_id: author}).exec();
        },
    },

};
