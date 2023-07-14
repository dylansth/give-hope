import { gql } from '@apollo/client';



export const LOGIN_USER = gql`
 mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $annualSalary: Int!) {
  addUser(username: $username, email: $email, password: $password, annualSalary: $annualSalary) {
    token
    user {
      username
      _id
    }
  }
}
`;

export const CREATE_CAMPAIGN = gql`
mutation CreateCampaign($campaignData: CampaignInput!) {
  createCampaign(campaignData: $campaignData) {
    description
    createdAt
    creatorId {
      _id
    }
    endDate
    image
    targetAmount
    title
  }
}
`;



export const REMOVE_BOOK = gql`
mutation UpdateCampaign($id: ID!, $campaignData: updateCampaignInput!) {
  updateCampaign(_id: $id, campaignData: $campaignData) {
    description
    title
    _id
  }
}
`;


let LOGIN_USER = () => {
  console.log("UserTest")
};

export default LOGIN_USER;

