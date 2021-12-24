const { gql } = require("apollo-server-express");

  // Schema definition
  const typeDefs = gql`
    type Query {
      currentNumber: Int
    }
    type Subscription {
      numberIncremented: Int
    }
  `;

  module.exports=typeDefs;