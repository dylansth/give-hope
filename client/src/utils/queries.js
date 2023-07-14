import { gql } from '@apollo/client';


export const QUERY_GET_ME = gql`
    {
        me {
    email
    username
    _id
    annualSalary
    createdCampaigns {
      _id
      createdAt
      currentAmount
      description
      endDate
      image
      targetAmount
      title
    }
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
    image   
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

