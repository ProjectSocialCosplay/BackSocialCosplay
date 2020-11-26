const { gql } = require('apollo-server-express');

export default  gql`
    type Post {
        _id: ID!
        _id_author: User!
        description: String!
        create_at: Date!
    }
    extend type Query {
        # Gets user posts by pseudo
        getUserPosts(pseudo: String!, skip: Int, limit: Int): Post

        # Gets posts from followed users
        # getFollowedPosts(userId: String!, skip: Int, limit: Int): Post
        
        # Gets all posts
        getPosts(authUserId: ID!, skip: Int, limit: Int): Post
        
        # Gets post by id
        getPost(id: ID!): Post
        
   }
    extend type Mutation {
        createPost(
            description: String!
        ): Post!
        deleteMessage(_id: ID!): Post!
   }
`;