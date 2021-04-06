import {AuthenticationError} from 'apollo-server-express'


export default {
    Query: {},
    Mutation: {
        createEvent: async (parent, {event_name, event_date_start, event_date_end, event_url, description, location}, {
            models: {eventModel},
            userInfo
        }, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const author = userInfo._id
            return await new eventModel({
                event_name,
                author,
                event_date_start,
                event_date_end,
                event_url,
                description,
                location
            }).save()
        },
    },
}