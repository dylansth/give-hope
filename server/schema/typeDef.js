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


input updateCampaignInput {
  title: String
  description: String
  image: String
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
    # updateUser(firstName: String, lastName: String, email: String, password: String): User
    # deleteUser(userId: ID!): User
    createCampaign(campaignData: CampaignInput!): Campaign
    updateCampaign(_id:ID!, campaignData: updateCampaignInput!): Campaign
    deleteCampaign(campaignId: ID!): Campaign
    # saveReview(reviewData: ReviewInput!): Review
    # updateReview(reviewId: ID!, reviewData: ReviewInput!): Review
    # makeDonation(campaignId: ID!, amount: Int!): Donation
    createReview(campaignId: ID!, description:String!, creatorId:ID, createdAt:String ): Review
    # deleteReview(_id: String!): Review
   
}
type Query {
    me: User
    user: User
    users:[User]
    campaigns: [Campaign]
    donations:[Donation]



}`

module.exports = typeDef;