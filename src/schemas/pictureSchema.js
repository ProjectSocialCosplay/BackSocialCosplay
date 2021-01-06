import {gql} from 'apollo-server-express';

export default gql`

    type Picture{
        key: String!,
        url: String!,
        description: String,
        tags: String,
        author: User
    }
    
    extend type Mutation {
        uploadProfileImage(base64str: String): Picture
    }
`;