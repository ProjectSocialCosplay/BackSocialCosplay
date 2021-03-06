import {gql} from 'apollo-server-express';

export default gql`
    type Post {
        _id: ID!
        content: String!
        author: User!
        comment: [Comment]
        likes: [Like]
        updatedAt: Date
    }

    extend type Query {
        # Get user Post
        getPost(id: ID!): [Post]!

        #Get User 
        getAllPost: [Post]!
    }

    extend type Mutation {
        # Creates a new post
        createPost(content: String!): Post!

        # Deletes a user post
        deletePost(id: ID!): Post
    }
`;
