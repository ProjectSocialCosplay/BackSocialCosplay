import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pictureSchema = Schema(
    {
        key: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        tags: {
            type: String,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Picture', pictureSchema);
