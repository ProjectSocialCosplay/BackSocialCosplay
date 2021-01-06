import {AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        getPostWithUserId: async (parent, { id }, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await postModel.find({author: id}).sort({updatedAt: -1}).exec()
        },

        getAllPost: async (parent, args, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await postModel.find({author: userInfo._id}).sort({updatedAt: -1}).exec()
        },
    },
    Mutation: {
        createPost: async (parent, { content }, { models: { postModel, userModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const newPost = await new postModel({
                content,
                author: userInfo._id
            }).save();

            await postModel.create(newPost)
            await userModel.findOneAndUpdate({ _id: userInfo._id }, { $push: { post: newPost._id }}).catch((e)=>{
                throw new Error(e.message)
            })
            return newPost
        },

        deletePost: async (parent, { id }, { models: { postModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            //Remove Image From Azure
            //Remove  Post and post form users collection
            //remove comments
            //remove from user Collection
            //remove like
            // Find user notification in users collection and remove them
        },
    },

    Post: {
        author: async ({ author }, args, { models: { userModel }}, info) => {
            return await userModel.findById({_id: author}).exec();
        },
        comment: async ({id}, args, {models: {commentModel}}, info) => {
            return await commentModel.find({post: id}).sort({updatedAt: -1}).exec();
        },
    },

};
