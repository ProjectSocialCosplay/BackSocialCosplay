import { gql } from 'apollo-server-express';

export default gql`

  type Chatbot {
    author: User!
    message: String!
  }

  extend type Query {
    getMessage(message: String!): Chatbot!
  }

  extend type Mutation {
    sendMessage(message: String!): Chatbot!
  }
`;