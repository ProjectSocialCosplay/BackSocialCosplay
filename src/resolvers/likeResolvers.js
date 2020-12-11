import {AuthenticationError} from 'apollo-server';

export default {
    Query: {

        getAuthUserlike: async (parent, {id}, {models: {likeModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await likeModel.find({author: id}).sort({updatedAt: -1}).exec()
        },
        getPostLike: async (parent, args, {models: {likeModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await likeModel.find({author: userInfo._id}).sort({updatedAt: -1}).exec();
        },
    },

    Mutation: {
        like: async (root, {postId}, {models: {likeModel, postModel, userModel},userInfo},info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const like = await new likeModel({user: userInfo._id, post: postId}).save();

            console.log(like)
            console.log(userInfo)
            console.log(like.post)
            // Push like to post collection
            await postModel.findOneAndUpdate({_id: like.post}, {$push: {likes: like.id}}).catch((e)=>{
                console.log(e)
            });
            // Push like to user collection
            await userModel.findOneAndUpdate({_id: like.user}, {$push: {likes: like.id}}).catch((e)=>{
                console.log(e)
            });
            return like;
        },

        unLike: async (root, {input: {id}},  {models: {likeModel, postModel, userModel}, userInfo},info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const like = await likeModel.findByIdAndRemove(id);

            await userModel.findOneAndUpdate({_id: like.user}, {$pull: {likes: like.id}});

            await postModel.findOneAndUpdate({_id: like.post}, {$pull: {likes: like.id}});

            return like;
        },
    },

    Like: {
        user: async ({}, args,  {models: {userModel},userInfo}, info) => {
            return await userModel.findById({_id: userInfo._id}).sort({updatedAt: -1}).exec();
        },
        post: async ({postId}, args,  {models: {postModel}}, info) => {
            return await postModel.findById({_id: postId}).sort({updatedAt: -1}).exec();
        },
    },
};