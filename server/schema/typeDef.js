const { gql } = require('apollo-server-express');

const typeDef = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    annualSalary: Int!
    createdCampaigns: [Campaign]
    donatedCampaigns: [Campaign]
  }

  type Campaign {
    _id: ID!
    title: String!
    description: String!
    image: CampaignImage
    creatorId: User
    targetAmount: Int
    currentAmount: Int
    endDate: String
    donations: [Donation]
    createdAt: String
    reviews: [Review]
  }

  type CampaignImage {
    data: String
    contentType: String
  }

  input CampaignImageInput {
    data: String
    contentType: String
  }

  type Donation {
    _id: ID!
    campaignId: ID
    donorId: ID
    amount: Int
    createdAt: String
  }

  type Purchase_power {
    _id: ID!
    charity_portion: String
    userId: [User]
  }

  type Review {
    _id: ID!
    description: String
    creatorId: [User]
    campaigns: [Campaign]
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }


  input ReviewInput {
    description: String
    creatorId: ID
    campaignId: ID
    createdAt: String
  }

  input DonationInput {
    campaignId: ID
    donorId: ID
    amount: Int
    createdAt: String
  }

  input CampaignInput {
    title: String
    description: String
    image: String
    creatorId: ID
    targetAmount: Int
    currentAmount: Int
    endDate: String
    donations: [ID]
    createdAt: String
    reviews: [ID]
  }

  input UpdateCampaignInput {
    title: String
    description: String
    image: CampaignImageInput
    targetAmount: Int
    currentAmount: Int
    creatorId: ID
    endDate: String
    donations: [ID]
    reviews: [ID] 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, annualSalary: Int!): Auth
    login(email: String!, password: String!): Auth
    createCampaign(campaignData: CampaignInput!): Campaign
    updateCampaign(_id: ID!, campaignData: UpdateCampaignInput!): Campaign
    deleteCampaign(campaignId: ID!): Campaign
    makeDonation(donationData: DonationInput, amount: Int): Donation
    createReview(campaignId: ID!, description: String!, creatorId: ID, createdAt: String): Review
    deleteReview(reviewId: ID!): Review
  }

  type Query {
    me: User
    user: User
    users: [User]
    campaigns: [Campaign]
    donations: [Donation]
  }
`;

module.exports = typeDef;
