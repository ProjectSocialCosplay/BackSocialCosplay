import {gql} from 'apollo-server-express';

export default  gql`
  type Like {
    id: ID!
    post: ID
    author: ID
  }

  extend type Query {
    # Get user Like
    like(id: ID!): [Like]!
    
    #Get User Likes
    likes: [Like]!
}

  extend type Mutation {
    createLike(userId: ID!,postId: ID!): Like
    deleteLike(id: ID!): Like
  }
`;