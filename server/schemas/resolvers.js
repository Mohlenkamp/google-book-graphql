const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');


const resolvers = {

    // Query: {
    //     helloWorld: () => {
    //         return `Hello world`;
    //     }
    // },

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

              return userData;
            }
            throw new AuthenticationError('Not logged in');
          }
      },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent,saveBook) => {
            const user = await User.find({ saveBook });
            if (!user) {
              throw new AuthenticationError('User not found with this saved book data');
            }
          
            return { user };
          },
          removeBook: async (parent, bookId) => {
            const user = await User.find({ bookId });
            if (!user) {
              throw new AuthenticationError('User not found with this remove book data');
            }
          
            return { user };
          }
    }
};

module.exports = resolvers;