import React from 'react';

function CampaignReviews({ reviews }) {
  return (
    <div>
      {reviews.map((review) => (
        <div className='' key={review._id}>
      <p className='font-bold underline underline-offset-4 '> {review.creatorId.username.toUpperCase()} </p>
        <p className='text-lg'>
          {review.description} created at {review.createdAt} 
        </p>
        </div>
      ))}
    </div>
  );
}

export default CampaignReviews;
