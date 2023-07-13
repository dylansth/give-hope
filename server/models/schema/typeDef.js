const { gpl } = require('apollo-server-express');
const typeDef = gpl`
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
}`

module.exports = typeDef;