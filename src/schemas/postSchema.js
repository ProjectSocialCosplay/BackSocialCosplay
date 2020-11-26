const { gql } = require('apollo-server-express');

module.exports = gql`
    type Post {
        _id: ID!
        _id_author: User!
        description: String!
        create_at: Date!
    }
    extend type Query {
        getUserPosts(_id_author: ID!): User!
        getPostById(_id: ID!): Post!
   }
    extend type Mutation {
        createPost(
            _id_author: User!
            description: String!
        ): Post!
   }
`;