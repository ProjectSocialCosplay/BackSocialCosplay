import { gql } from 'apollo-server';

export default  gql`
  type Comment {
    id: ID!
    comment: String!
    author: ID
    post: ID
    createdAt: String
  }

  extend type Query {
    # Get user Comment
    comment(id: ID!): [Comment]!
    
    #Get User 
    comments: [Comment]!
}
  extend type Mutation {
    createComment(comment: String!,  author: ID!,  postId: ID! ): Comment
    deleteComment(id: ID!): Comment
  }
`;