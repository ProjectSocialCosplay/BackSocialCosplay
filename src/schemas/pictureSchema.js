const { gql } = require('apollo-server-express');

module.exports = gql`

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