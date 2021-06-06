import { gql } from 'apollo-server-express';

export default gql`

  type Follow {
    _id: ID!
    user: User! #user suit  
    follower: User!
  }
  
  extend type Mutation {
    createFollow( followerId: ID!): Follow
    deleteFollow( id: ID!): Follow
  }
`;
//# sourceMappingURL=followSchema.js.map