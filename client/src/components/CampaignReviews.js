import React from 'react';

function CampaignReviews({ reviews }) {
  return (
    <div>
      {reviews.map((review) => (
        <p key={review.createdAt}>
          {review.description} created at {review.createdAt}
        </p>
      ))}
    </div>
  );
}

export default CampaignReviews;
