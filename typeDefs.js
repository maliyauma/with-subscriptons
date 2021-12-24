const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type BlogPost {
    _id: String

    title: String

    body: String

    postImage: String
  }

  type Aggregate {
    count: String
  }

  type BlogPosts {
    nodes: [BlogPost]

    aggregate: Aggregate
  }

  type Query {
    blogPosts: BlogPosts

    blogPost(id: String): BlogPost
  }

  type Mutation {
    addBlogPost(title: String, body: String, postImage: String): BlogPost
  }

  type Mutation {
    addBlogPost(title: String, body: String, postImage: String): BlogPost
  }

  type Subscription {
    newBlogPost: BlogPost
  }
`;

module.exports =  typeDefs ;
