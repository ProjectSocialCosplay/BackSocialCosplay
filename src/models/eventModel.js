const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema(
    {
        event_name:
            {
                type: String,
                required: true,
                unique: true,
                trim: true,
                minLength: [3, 'event name is too short'],
            },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        event_date_start: {
            type: Date,
            required: null,
        },
        event_date_end: {
            type: Date,
            required: null,
        },
        event_url: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
    }, {
        timestamps: true,
    });

export default mongoose.model('Event', eventSchema);