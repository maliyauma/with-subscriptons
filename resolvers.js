const { PubSub } = require("apollo-server-express");

const _r = require("./data");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    blogPosts(parent, args, context, info) {
      const blgPosts = _r.blogPosts;

      return {
        nodes: blgPosts,

        aggregate: {
          count: blgPosts.length,
        },
      };
    },

    blogPost(parent, args, context, info) {
      const blgPosts = _r.blogPosts;

      const id = args.id;

      return blgPosts.find((r) => r.id == id);
    },
  },

  Mutation: {
    addBlogPost(parent, args, context, info) {
      const { title, body, postImage } = args;

      const newBlogPost = {
        id: Date.now(),

        title,

        body,

        postImage,
      };

      _r.blogPosts.push(newBlogPost);

      pubsub.publish("NEW_BLOGPOST", { newBlogPost });
    },
  },

  Subscription: {
    newBlogPost: {
      resolve: (payload) => payload.newBlogPost,

      subscribe: () => pubsub.asyncIterator("NEW_BLOGPOST"),
    },
  },
};

module.exports = resolvers;
