import {AuthenticationError} from 'apollo-server';

export default {
    Query: {

        comment: async (parent, { id }, { models: { commentModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await commentModel.find({author: id}).exec()
        },
        comments: async (parent, args, { models: { commentModel }, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await commentModel.find({author: userInfo._id}).exec();
        },
    },
    Mutation: {
        createComment: async (root, { comment, postId } ,  {models: { commentModel } }, userInfo) => {
            return await commentModel.create({comment, post: postId, author: userInfo._id});
        },
        deleteComment: async (root, { commentId  }, {models: { commentModel } }, userInfo) => {
            const filter = {_id:commentId}
            const message = {"message":"Deleted !"}
            commentModel.deleteOne(filter).then(() => {
                console.log("OKEEEYY")
                return {message}
            }).catch((error)=> {
                console.log(error);
                throw new Error("Cannot Delete")
            });
        },
    }
  };
  