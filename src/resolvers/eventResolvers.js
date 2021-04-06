import {AuthenticationError} from 'apollo-server-express'


export default {
    Query: {

    },
    Mutation: {
         createEvent: async (parent, { event_name, id_organizer, event_date, event_banner_image, event_url, description, medias, participants, locations }, { models: {userModel, pictureModel}, userInfo }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            let id_organizer = userInfo._id
            let event_banner_image =
            const newEvent = await new eventModel({
                event_name,
                id_organizer,
                event_date,
                event_banner_image,
                event_url,
                description,
                medias,
                participants,
                location
            }).save();
            console.log(id_organizer);
         },
    },
}