const {mongoose} = 'mongoose';

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

module.exports =  mongoose.model('Picture', pictureSchema);
