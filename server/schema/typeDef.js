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
    descripton: String
    creatorId: [User]
    campaignId: [Campaign]
    createdAt: Date
}
type Auth {
    token: ID!
    user: User
}
input ReviewInput{
    description: String
    creatorId: [User]
    campaignId: [Campaign]
    createdAt: Date, 
}
type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    saveReview(reviewData: ReviewInput!): User
    deleteReview(_id: String!): User
    login(email: String!, password: String!): Auth
}
type Query {
    me: User
}`

module.exports = typeDef;