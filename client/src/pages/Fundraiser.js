import React from 'react';
import '../styles/style.css'
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';

const CampaignData = () => {
    const { loading, data } = useQuery(QUERY_CAMPAIGN
    );
    const campaignList = data?.campaigns || [];

    console.log(campaignList)

    return (
        <div>
            {campaignList.map((campaign, index) => (
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
