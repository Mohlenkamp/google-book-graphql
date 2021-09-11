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
                .populate('books');
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
          saveBook: async (parent, {bookId} ,context) => {
            if (context.user) {
              
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookId } },
                { new: true }
              );
              return User;
            }
              throw new AuthenticationError('User not found with this saved book data');
            },
 
          removeBook: async (parent,{bookId}, context) => {
            if (context.user) {
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: bookId } },
                { new: true }
              );
              return User;
            }
              throw new AuthenticationError('User not found with this saved book data');
            }
    }
  }
  


module.exports = resolvers;