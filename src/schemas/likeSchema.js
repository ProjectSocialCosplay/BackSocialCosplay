const { gql } = require('apollo-server-express');

module.exports =  gql`
    type Like {
        _id: ID!
        post: Post!
        author: User!
    }

    extend type Query {
        # Get user Like
        like(id: ID!): [Like]!

        #Get User Likes
        likes: [Like]!
    }


    extend type Mutation {
        createLike(postId: ID!): Like
        deleteLike(postId: ID!): Like
    }
`;