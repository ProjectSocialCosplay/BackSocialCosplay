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
            return await commentModel.find({author: me._id}).exec();
        },
    },
    Mutation: {
        createComment: async (root, { input: { comment, author, postId } }, { Comment, Post, User }) => {
        const newComment = await new Comment({
            comment,
            author,
            post: postId,
        }).save();
    
        // Push comment to post collection
        await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment.id } });
        // Push comment to user collection
        await User.findOneAndUpdate({ _id: author }, { $push: { comments: newComment.id } });
    
        return newComment;
        },
        deleteComment: async (root, { input: { id } }, { Comment, User, Post }) => {
        const comment = await Comment.findByIdAndRemove(id);
    
        // Delete comment from users collection
        await User.findOneAndUpdate({ _id: comment.author }, { $pull: { comments: comment.id } });
        // Delete comment from posts collection
        await Post.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: comment.id } });
    
        return comment;
        },
    }
  };
  