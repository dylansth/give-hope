import React, { useState } from 'react';
// import '../styles/style.css'

const CampaignData = () => {
    const [campaigns, setCampaigns] = useState([{
        "title": "Helping Hands for Children",
        "description": "Support underprivileged children by providing them with education and healthcare.",
        "creatorId": "",
        "targetAmount": 10000,
        "currentAmount": 5000,
        "endDate": "2023-12-31",
        "donations": [],
        "createdAt": "2023-07-13",
        "reviews": [],
        "image": ""
    },
    {
        "title": "Save the Rainforest",
        "description": "Contribute to the preservation of the Amazon rainforest and protect its diverse ecosystem.",
        "creatorId": "",
        "targetAmount": 5000,
        "currentAmount": 2500,
        "endDate": "2023-11-30",
        "donations": [],
        "createdAt": "2023-07-12",
        "reviews": [],
        "image": ""
    }]
    )

    return (
        <div>
            {campaigns.map((campaign, index) => (
                <div key={index}>
                    <h1>{campaign.title}</h1>
                    <p>{campaign.description}</p>
                    <p>Creator ID: {campaign.creatorId}</p>
                    <p>Target Amount:${campaign.targetAmount}</p>
                    <p>Current Amount: ${campaign.currentAmount}</p>
                    <p>End Date: {campaign.endDate}</p>
                    <p>Donation: ${campaign.donations}</p>
                </div>
            ))}
        </div>
    )
};


export default CampaignData;
