import React from 'react';

function CampaignReviews({ reviews }) {
  return (
    <div>
      {reviews.map((review) => (
        <div className='' key={review._id}>
      <p className='font-bold underline underline-offset-4 mb-0 '> {review.creatorId.username.toUpperCase()} </p>
        <p className='text-lg mb-0'>
          {review.description} 
        </p>
        <p className='text-sm'>Created at {review.createdAt}  </p>
        </div>
      ))}
    </div>
  );
}

export default CampaignReviews;
