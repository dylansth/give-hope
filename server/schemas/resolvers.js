const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { findById } = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, {bookAuthor, description, title, bookId, image, link}, context) => {
      if (!context.user) {
        throw new Error('User not authenticated.');
      }
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          {
            $push: {
              savedBooks: {
                bookAuthor,
                description,
                title,
                bookId,
                image,
                link,
              },
            },
          },
          { new: true }
        );
    
        return updatedUser;
      } catch (error) {
        throw new Error('Failed to save book.');
      }
    },
    
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId : bookId}} },
              { new: true }
          )
          return updatedUser;
      }
      throw new AuthenticationError ('You need to be log in first.');
  }
  } }

  module.exports = resolvers;
