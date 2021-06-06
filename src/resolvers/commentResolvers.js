const {AuthenticationError} = require('apollo-server-express')

module.exports =  {
    Query: {
        getComment: async (parent, {id}, {models: {commentModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await commentModel.find({_id: id}).sort({updatedAt: -1}).exec()
        }
    },
    Mutation: {
        createComment: async (root, {comment, postId}, {models: {postModel, commentModel}, userInfo}) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }

            let author = userInfo._id
            let post = postId;
            let data = new commentModel({comment, post, author})
            await commentModel.create(data)
            await postModel.findOneAndUpdate({_id: postId}, {$push: {comments: data._id}}).catch((e) => {
                console.log(e)
                throw new Error(e.message)
            })
            return data
        },

        deleteComment: async (root, {commentId}, {models: {postModel, commentModel}, userInfo}) => {
            const comment = await commentModel.findByIdAndRemove(commentId)

            // Delete like from post collection
            let data = await postModel.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: commentId}});
            return {message: 'Comment deleted.'};
        },

    },
    Comment: {
        author: async (parent, arg, {models: {userModel}, userInfo}, info) => {
            return await userModel.findOne({_id: parent.author}).exec()
        },
        post: async (parent, arg, {models: {postModel}}, info) => {
            return await postModel.findOne({_id: parent.post}).exec()
        },
    },
};
  