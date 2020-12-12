import { gql } from 'apollo-server';

export default  gql`
  type Like {
    _id: ID!
    post: Post
    user: User
  }

  extend type Query {
    getAuthUserlike(id: ID!): [Like]!
    
    #Get User Likes
    getPostLike: [Like]!
}

  extend type Mutation {
    like(postId: ID!): Like
    
    unLike(id: ID!): Like
  }
`;