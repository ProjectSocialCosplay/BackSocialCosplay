import {gql} from 'apollo-server-express';

export default gql`
    type Event {
        _id: ID!
        event_name: String
        author: User!
        event_date_start: Date
        event_date_end: Date
        event_url: String
        description: String
        location: String
    }

    extend type Mutation {
        createEvent(event_name: String, event_date_start: Date, event_date_end:Date, event_url:String, description: String, location: String): Event
    }
`;
