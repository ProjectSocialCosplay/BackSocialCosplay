import { gql } from 'apollo-server';

export default  gql`
  type Comment {
    id: ID!
    comment: String!
    post: ID!
    createdAt: String!
  }

  type deleteComment {
    message: String!
  }

  extend type Query {
    # Get user Comment
    comment(id: ID!): [Comment]!
    
    #Get User 
    comments: [Comment]!
}
  extend type Mutation {
    createComment(comment: String!, postId: ID! ): Comment
    deleteComment(commentId: ID!): deleteComment
  }
`;