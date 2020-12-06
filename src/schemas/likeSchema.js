import { gql } from 'apollo-server';


export default  gql`

  type Like {
    id: ID!
    post: ID
    user: ID
  }

  extend type Mutation {
    createLike(userId: ID!,postId: ID!): Like
    deleteLike(id: ID!): Like
  }
`;