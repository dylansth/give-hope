const { Campaign, User, Donation, Purchase_power, Review } = require('../models');
const { ObjectId } = require('mongoose')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SK_TEST);



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
        return User.findOne({ _id: context.user._id }).populate({
          path: 'createdCampaigns',
          populate: [
            { path: 'creatorId', model: 'User' },
            { path: 'donations', model: 'Donation' },
            { path: 'reviews', model: 'Review' },
          ],
        })
          .populate({
            path: 'donatedCampaigns',
            populate: [
              { path: 'campaignId', model: 'Campaign' },
            ],
          });
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    campaigns: async () => {
      return Campaign.find().populate({
        path: 'reviews',
        populate: 
        {path: 'creatorId', model: 'User'},
      })
      .populate({
        path: 'donations',
        populate: [
          { path: 'donorId', model: 'User' },
        ],
      })
      .populate('creatorId', 'username');
    },

    donations: async () => {
      return Donation.find().populate({
        path: 'campaignId',
      })
      .populate ({
        path: 'donorId'
      })
    },

 
    reviews: async () => {
      return Review.find().populate('creatorId');
    },

    createCheckoutSession: async (_, __, context) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          // line_items: [{
          //   price: 'price_1NiEUjJXm36fL6cJLQ2AsOFw',
          //   quantity: 1,
          //   unit_amount: 'USD'
          // }],
          mode: 'payment',
          success_url: 'https://yourwebsite.com/success', // Customize this
          cancel_url: 'https://yourwebsite.com/cancel'    // Customize this
        });

        return { session: session.id }; 
      } catch (error) {
        console.error('Error creating checkout session:', error);
        throw new Error('Failed to create checkout session.');
      }
    }


  //   checkout: async (_, { amount }, context) => {
  //     try {
  //       const url = new URL(context.headers.referer).origin;
    
  //       const line_items = [
  //         {
  //           price_data: {
  //             currency: 'usd',
  //             product_data: {
  //               name: 'Donation',
  //             },
  //             unit_amount: amount * 100,
  //           },
  //           quantity: 1,
  //         },
  //       ];
    
  //       const session = await stripe.checkout.sessions.create({
  //         payment_method_types: ['card'],
  //         line_items,
  //         mode: 'payment',
  //         success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
  //         cancel_url: `${url}/cancel`,
  //       });
    
  //       return { session: session.id };
  //     } catch (error) {
  //       console.error('Checkout error:', error);
  //       throw new Error('Error creating checkout session');
  //     }
  //   },

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
          endDate: campaignData.endDate,
          currentAmount: 0,
          createdAt: new Date().toISOString(),
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

    // makeDonation: async (parent, args, context) => {
    //   if (!context.user) {
    //     throw new Error('User not authenticated.');
    //   }
    //   console.log(args.donationData.campaignId);
    //   const userId = context.user._id;
    //   const { campaignId, amount } = args.donationData

    //   const campaign = await Campaign.findById(campaignId);
    //   console.log(campaign, "data");

    //   if (!campaign) {
    //     throw new Error('Campaign not found');
    //   }

    //   try {
    //     const createDonation = await Donation.create({
    //       amount: amount,
    //       donorId: userId,
    //       campaignId: campaign._id,
    //       // createdAt: new Date().toISOString(),
    //     });

    //     campaign.donations.push(createDonation._id);
    //     const updatedTotal = campaign.currentAmount + amount;
    //     campaign.currentAmount = updatedTotal;
    //     await campaign.save();

    //     const user = await User.findById(userId);
    //     console.log(user);
    //     user.donatedCampaigns.push(createDonation._id);
    //     await user.save();

    //     return createDonation;
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error('Failed to save donation.');
    //   }
    // },

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
          donorId: userId,
          campaignId: campaign._id,
          // createdAt: new Date().toISOString(),
        });
    
        campaign.donations.push(createDonation._id);
        const updatedTotal = campaign.currentAmount + amount;
        campaign.currentAmount = updatedTotal;
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

  },

}
module.exports = resolvers;
