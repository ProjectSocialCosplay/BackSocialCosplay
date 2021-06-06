const { gql } = require('apollo-server-express');

module.exports =  gql`

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