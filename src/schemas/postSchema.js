import { gql } from 'apollo-server';

export default gql`
    type Post {
        id: ID!
        content: String!
        author: User!
    }

    extend type Query {
        # Get user Post
        post(id: ID!): [Post]!
        
        #Get User 
        posts: [Post]!
    }

    extend type Mutation {
        # Creates a new post
        createPost(content: String!): Post!
        
        # Deletes a user post
        deletePost(id: ID!): Post
    }
`;
