import {AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        getMessage: async (parent, {id}, {models: {chatbotModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await chatbotModel.find({_id: id}).sort({updatedAt: -1}).exec()
        }
    },
    Mutation: {
        sendMessage: async (root, {message}, {models: {chatbotModel}, userInfo}) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const newMessage = await new chatbotModel
            ({
                message,
                author: userInfo._id
            }).save();
            return newMessage
        },
    }
}