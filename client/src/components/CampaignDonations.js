import React from 'react';


function CampaignDonations({ donations }) {
  return (
    <div>
      {donations.map((donation) => (
        <div className='' key={donation._id}>
        <p className='text-lg mb-0'>
          $ {donation.amount} 
        </p>
        <p className='text-sm'>Donated at {donation.createdAt}  </p>
        </div>
      ))}
    </div>
  );
}

export default CampaignDonations;
