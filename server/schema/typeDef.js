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
    creatorId: [User]
    targetAmount: Int
    currentAmount: Int
    endDate: Date
    donations: [Campaign]
    createdAt: Date
    reviews: [Review]
}
type Donation {
    _id: ID!
    campaignId: [Campaign]
    donorId: [User]
    amount: Int
    createdAt: Date
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
    createdAt: Date
}
type Auth {
    token: ID!
    user: User
}
input ReviewInput{
    _id: ID!
    description: String
    creatorId: User
    campaignId: [Campaign]
    createdAt: Date, 
}

input CampaignInput{
    _id: ID!
    title: String!
    description: String!
    image: String
    creatorId: [User]
    targetAmount: Int
    currentAmount: Int
    endDate: Date
    donations: [Campaign]
    createdAt: Date
    reviews: [Review]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(userId: ID!): User
    saveReview(reviewData: ReviewInput!): Review
    updateReview(reviewId: ID!, reviewData: ReviewInput!): Review
    createdCampaign(reviewData: CampaignInput!): Campaign
    updateCampaign(campaignId: ID!, campaignData: CampaignInput!): Campaign
    deleteCampaign(campaignId: ID!): Campaign
    makeDonation(campaignId: ID!, amount: Int!): Donation
    deleteReview(_id: String!): Review
    login(email: String!, password: String!): Auth
}
type Query {
    me: User
    user: User
    users:[User]
    campaigns: [Campaign]
    donations:[Donation]



}`

module.exports = typeDef;