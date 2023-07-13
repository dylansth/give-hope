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
    image: String
    creatorId: User
    targetAmount: Int
    currentAmount: Int
    endDate: String
    donations: [Donation]
    createdAt: String
    reviews: [Review]
}
type Donation {
    _id: ID!
    campaignId: [Campaign]
    donorId: [User]
    amount: Int
    createdAt: String
}
type Purchase_power {
    charity_portion: String
    userId: [User]
}
type Review {
    _id: ID!
    description: String
    creatorId: [User]
    campaignId: [Campaign]
    createdAt: String
}
type Auth {
    token: ID!
    user: User
}

input ReviewInput {
  _id: ID!
  description: String
  creatorId: ID
  campaignId: ID
  createdAt: String
}

input CampaignInput {
  _id: ID!
  title: String!
  description: String!
  image: String
  creatorId: ID
  targetAmount: Int
  currentAmount: Int
  endDate: String
  donations: [ID]
  createdAt: String
  reviews: [ID]
}


type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    # updateUser(firstName: String, lastName: String, email: String, password: String): User
    # deleteUser(userId: ID!): User
    createCampaign(reviewData: CampaignInput!): Campaign
    updateCampaign(campaignData: CampaignInput!): Campaign
    deleteCampaign(campaignId: ID!): Campaign
    # saveReview(reviewData: ReviewInput!): Review
    # updateReview(reviewId: ID!, reviewData: ReviewInput!): Review
    # makeDonation(campaignId: ID!, amount: Int!): Donation
    # deleteReview(_id: String!): Review
    # login(email: String!, password: String!): Auth
}
type Query {
    me: User
    user: User
    users:[User]
    campaigns: [Campaign]
    donations:[Donation]



}`

module.exports = typeDef;