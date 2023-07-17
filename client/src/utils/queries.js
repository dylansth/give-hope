import { gql } from '@apollo/client';


export const QUERY_GET_ME = gql`
  me {
    _id
    username
    annualSalary
     email
    createdCampaigns {
      _id
    }
    donatedCampaigns {
      _id
    }
  }
`;

export const QUERY_CAMPAIGN = gql`
    {
  campaigns {
    createdAt
    creatorId {
      _id
    }
    endDate
    image {
      contentType
      data
    }  
    title
    currentAmount
    targetAmount
    description
    donations {
      _id
      amount
      createdAt
      donorId {
        _id
      }
    }
    reviews {
      createdAt
      creatorId {
        _id
      }
      description  
    }
  }
}
`;


export const QUERY_DONATION = gql`
donations {
  _id
  amount
  campaignId {
    _id
  }
  createdAt
  donorId {
    _id
  }
}
`