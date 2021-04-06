import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = Schema(
    {
      event_name:
      {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, 'event name is too short'],
      },
      id_organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      event_date: {
        type: Date,
        required: null,
      },
      event_banner_image: {
         type: Schema.Types.ObjectId,
         ref: 'Picture'
      },
      event_url: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      medias: [{
        type: Schema.Types.ObjectId,
        ref: 'Picture'
      }],
      participants: [{
         type: Schema.Types.ObjectId,
         ref: 'User'
      }],
       location : {
         type: String,
         trim: true,
       },
    }, {
        timestamps: true,
 });

export default mongoose.model('Event', eventSchema);