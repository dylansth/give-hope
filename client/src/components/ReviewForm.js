import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations';

function ReviewForm({ onReviewCreate, campaignId }) {
  const [inputValue, setInputValue] = useState('');

  const [addReviewMutation] = useMutation(ADD_REVIEW);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreateReview = async () => {
    try {
      await addReviewMutation({
        variables: {
          campaignId: campaignId,
          description: inputValue,
        },
      });

      // Call the parent component's callback when a review is created
      onReviewCreate(inputValue);
      setInputValue('');
      window.location.reload();
      console.log('Review created successfully');
    } catch (error) {
      console.error('Failed to create review:', error.message);
    }
  };

  return (
    <div>
   <div className="flex flex-col items-center py-5">
  <form onSubmit={handleCreateReview} className="w-full max-w-md">
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      type="text"
      name="description"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter your review here"
    />
  </form>
  <button
    className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    onClick={handleCreateReview}
  >
    Create a review
  </button>
</div>

    </div>
  );
}

export default ReviewForm;
