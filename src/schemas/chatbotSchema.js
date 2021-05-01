import { gql } from 'apollo-server-express';

export default gql`

  type Command {
    command: String!
    message: String!
    timeout: Int!
    isActive: Boolean!
  }

  extend type Query {
     getCommand(command: String!): Command!
  }
`;