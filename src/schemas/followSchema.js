import { gql } from 'apollo-server-express';

export default gql`

  type Follow {
    id: ID!
    user: ID
    follower: ID
  }

  input CreateFollowInput {
    userId: ID!
    followerId: ID!
  }
  input DeleteFollowInput {
    id: ID!
  }

  extend type Mutation {
    # Creates a following/follower relationship between users
    createFollow(input: CreateFollowInput!): Follow
    
    # Deletes a following/follower relationship between users
    deleteFollow(input: DeleteFollowInput!): Follow
  }
`;