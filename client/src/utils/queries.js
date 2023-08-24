import { gql } from '@apollo/client';


export const QUERY_GET_ME = gql`
 { me {
    _id
    annualSalary
    email
    username
     donatedCampaigns {
      amount
      createdAt
      campaignId {
        title
      }
    }
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
    endDate
    image {
      data
    }
    reviews {
      _id
      description
      createdAt
      creatorId {
      username
    }
    }
    targetAmount
    title
    donations {
      amount
      createdAt
    }
  }
}
`;


export const QUERY_DONATION = gql`
 {   donations {
    _id
    amount
    campaignId {
      _id
      title
    }
    createdAt
    donorId {
      _id
      username
    }
  }
}
`

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;