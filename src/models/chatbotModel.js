import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatbotSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
        maxLength: [255, 'Message is too long'],
        trim: true,
     }
  },
  {
    timestamps: true,
  });

const chatbot = mongoose.model('Chatbot', chatbotSchema);

export default chatbot;