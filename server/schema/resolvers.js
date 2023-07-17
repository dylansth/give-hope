const { Campaign, User, Donation, Purchase_power, Review } = require('../models');
const { ObjectId } = require('mongoose')
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
    addUser: async (parent, { username, email, password, annualSalary }) => {
      const user = await User.create({ username, email, password, annualSalary });
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

    createCampaign: async (parent, { campaignData }, context) => {
      // console.log(context);
      if (!context.user) {
        throw new Error('User not authenticated.');
      }
      const userId = context.user._id
      try {
        const createCampaign = await Campaign.create({
          title: campaignData.title,
          description: campaignData.description,
          image: {
            data: campaignData.image.data,
            contentType: campaignData.image.contentType,
          },
          creatorId: userId,
          targetAmount: campaignData.targetAmount,
          currentAmount: campaignData.currentAmount,
          endDate: campaignData.endDate,
          donations: campaignData.donations,
          createdAt: new Date().toISOString(),
          reviews: campaignData.reviews
        }
        );

        const user = await User.findById(userId);
        user.createdCampaigns.push(createCampaign._id);
        await user.save();

        return createCampaign;
      } catch (error) {
        throw new Error('Failed to save campaign.');
      }
    },

    updateCampaign: async (parent, { _id, campaignData }, context) => {
      if (!context.user) {
        throw new Error('User not authenticated.');
      }
      return await Campaign.findOneAndUpdate(
        { _id: _id },
        {
          title: campaignData.title,
          description: campaignData.description,
          targetAmount: campaignData.targetAmount,
          currentAmount: campaignData.currentAmount,
          endDate: campaignData.endDate,
          donations: campaignData.donations,
          reviews: campaignData.reviews
        },
        { new: true }
      );
    },

    deleteCampaign: async (parent, { campaignId }, context) => {
      if (!context.user) {
        throw new Error('User not authenticated.');
      }
      const userId = context.user._id;
    
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }
    
      const deleteCampaign = await Campaign.findOneAndDelete({ _id: campaignId });
    
      const user = await User.findById(userId);
      user.createdCampaigns.pull(deleteCampaign._id);
      await user.save();
    console.log(deleteCampaign)
    
      return deleteCampaign;
    },

      
      makeDonation: async (parent, { campaignId, amount }, context) => {
        if (!context.user) {
          throw new Error('User not authenticated.');
        }
      
        const userId = context.user._id;
        
        const campaign = await Campaign.findById(campaignId);
        
        if (!campaign) {
          throw new Error('Campaign not found');
        }
        
        try {
          const createDonation = await Donation.create({
            amount: amount,
            creatorId: userId,
            campaignId: campaign._id,
            createdAt: new Date().toISOString(),
          });
      
          campaign.donations.push(createDonation._id);
          await campaign.save();
          
          const user = await User.findById(userId);
          user.donatedCampaigns.push(createDonation._id);
          await user.save();
      
          return createDonation;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to save donation.');
        }
      },

    createReview: async (parent, { campaignId, description }, context) => {
      if (!context.user) {
        throw new Error('User not authenticated.');
      }

      const campaign = await Campaign.findById(campaignId)
      if (!campaign) {
        throw new Error('Campaign not found');
      }
      // console.log(campaign._id)
      try {
        const createReview = await Review.create({
          description: description,
          creatorId: context.user._id,
          campaignId: campaign._id,
          createdAt: new Date().toISOString(),
        }
        );

        campaign.reviews.push(createReview);
        await campaign.save();

        return createReview;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to save review.');
      }

    },

    deleteReview: async (parent, { reviewId }, context) => {
      if (!context.user) {
        throw new Error('User not authenticated.');
      }
      
      const review = await Review.findById(reviewId)
      if (!reviewId) {
        throw new Error('Review not found');
      }
        const deleteReview = await Review.findOneAndDelete(
          { _id: reviewId },
        )
        return deleteReview;
      }
  
  }
}
module.exports = resolvers;
