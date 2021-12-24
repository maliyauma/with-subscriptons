const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
const NEW_USER = "NEW_USER";

  let currentNumber = 0;
  function incrementNumber() {
    currentNumber++;
    pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
    setTimeout(incrementNumber, 1000);
  }
  // Start incrementing
  incrementNumber();

  const resolvers = {
    Query: {
      currentNumber() {
        return currentNumber;
      },
    },
    Mutation: {
        login: async (parent, { userInfo: { username } }, context) => {
          // check the password
          // await checkPassword(password);
          return username;
        },
        register: (_, { userInfo: { username } }) => {
          const user = {
            id: 1,
            username
          };
    
          pubsub.publish(NEW_USER, {
            newUser: user
          });
    
          return {
             user
          };
        }
      },
    Subscription: {
      numberIncremented: {
        subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
      },
      newUser: {
        subscribe: () => pubsub.asyncIterator(NEW_USER)
      }
    },
  };
  
  module.exports=resolvers