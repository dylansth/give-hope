const { Campaign, User, Donation, Purchase_power, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        campaigns: async () => {
            return Campaign.find();
          },
        donations: async () => {
            return Donation.find();
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
    
        createCampaign: async (parent, {campaignData}, context) => {
          if (!context.user) {
            throw new Error('User not authenticated.');
          }
        
          try {
            const createCampaign = await Campaign.create({ 
                _id: campaignData._id,
                title: campaignData.title,
                description: campaignData.description,
                image: campaignData.image,
                creatorId: campaignData.creatorId,
                targetAmount: campaignData.targetAmount,
                currentAmount: campaignData.currentAmount,
                endDate: campaignData.endDate,
                donations: campaignData.donations,
                createdAt: campaignData.createdAt,
                reviews: campaignData.reviews}
            );
        
            return createCampaign;
          } catch (error) {
            throw new Error('Failed to save campaign.');
          }
        },
        
        updateCampaign: async (parent, { id, campaignData }) => {
            return await Class.findOneAndUpdate(
              { _id: id }, 
              { description: campaignData.description,
                image: campaignData.image,
                creatorId: campaignData.creatorId,
                targetAmount: campaignData.targetAmount,
                currentAmount: campaignData.currentAmount,
                endDate: campaignData.endDate,
                donations: campaignData.donations,
                createdAt: campaignData.createdAt,
                reviews: campaignData.reviews },
              { new: true }
            );
          },


      //   removeBook: async (parent, { bookId }, context) => {
      //     if (context.user) {
      //         const updatedUser = await User.findByIdAndUpdate(
      //             { _id: context.user._id },
      //             { $pull: { savedBooks: { bookId : bookId}} },
      //             { new: true }
      //         )
      //         return updatedUser;
      //     }
      //     throw new AuthenticationError ('You need to be log in first.');
      // }
      // } 
        }
}

module.exports = resolvers;
