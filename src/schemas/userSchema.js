const {gql} = require('apollo-server-express');

export default gql`
    type User {
        _id: ID!
        _isActive: Boolean!
        pseudo: String!
        email: String!
        password: String!
        birthdate: Date
        create_at: Date!
        bio: String
        posts: [Post!]!
        profile_image_url: Photo!
    }

    type Token {
        token: String!
    }
    
    extend type Query {
        # get Info user with Id
        user(id: ID!): User!
        login(email: String!, password: String!): Token!
    }
    
    extend type Mutation {
        createUser(
            pseudo: String!,
            email: String!,
            password: String!,
            birthdate: Date,
            profile_image_url: String
        ): User!
    }
    
`;