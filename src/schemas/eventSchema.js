import {gql} from 'apollo-server-express';

export default gql`
      type Event {
        _id: ID!
        event_name: String
        id_organizer: User!
        event_date: Date
        event_banner_image: Picture!
        event_url: String
        description: String
        medias: [Picture]
        participants: [User]
        location: String
      }

      extend type Mutation {
      createEvent(event_name: String, id_organizer: User!, event_date: Date, event_banner_image: Picture!, event_url:
      String, description: String, medias: Picture, participants: User, location: String): Event
      }
`;
