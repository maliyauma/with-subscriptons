const { gql } = require("apollo-server-express");

// Schema definition
const typeDefs = gql`
  input UserInfo {
    username: String!
    age: Int
  }
  type RegisterResponse {
    user: User
  }

  type User {
    id: ID!
    username: String
  }
  type Query {
    currentNumber: Int
  }

  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): String!
  }
  type Subscription {
    numberIncremented: Int
    newUser: User!
  }
`;

module.exports = typeDefs;
