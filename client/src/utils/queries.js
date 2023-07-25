import { gql } from '@apollo/client';


export const QUERY_GET_ME = gql`
 {  me {
    _id
    annualSalary
    email
    username
  }
  campaigns {
    _id
    createdAt
    currentAmount
    description
    endDate
    reviews {
      description
    }
    image {
      data
      contentType
    }
    creatorId {
      _id
    }
    title
    targetAmount
    donations {
      amount
    }
  }
 }
`;

export const QUERY_CAMPAIGN = gql`
    {
      campaigns {
    _id
    createdAt
    creatorId {
      _id
      username
    }
    currentAmount
    description
    image {
      data
    }
    title
    targetAmount
    endDate
    donations {
      _id
      amount
      createdAt
      donorId {
        _id
        username
      }
      campaignId {
        _id
      }
    }
    reviews {
      _id
      description
      createdAt
      campaigns {
        _id
      }
    }
  }
}
`;


export const QUERY_DONATION = gql`
 { donations{
  _id
  amount
  campaignId {
    _id
  }
  createdAt
  donorId {
    _id
  }
}}
`