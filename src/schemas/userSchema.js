import { gql } from 'apollo-server-express';

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
        #posts: [Post]
    }
    
    type Token {
        token: String!
    }

   extend type Query {
        user(id: ID!): User!
        login(email: String!, password: String!): Token!
   }
   extend type Mutation {
        createUser(
            pseudo: String!, 
            email: String!, 
            password: String!,
            birthdate: Date,
        ): User!
       
   }
`;