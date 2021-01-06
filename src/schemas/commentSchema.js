import {gql} from 'apollo-server-express';

export default gql`
    type Comment {
        _id: ID!
        comment: String!
        post: Post!
        createdAt: String!
        author: User!
    }

    type deleteComment {
        message: String!
    }

    extend type Query {
        # Get user Comment
        getCommentPost(id: ID!): [Comment]!

    }
    extend type Mutation {
        createComment(comment: String!, postId: ID! ): Comment
        deleteComment(commentId: ID!): deleteComment
    }
`;