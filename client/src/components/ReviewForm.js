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
      <div className="flex justify-center pt-5">
        <form onSubmit={handleCreateReview} className="w-full max-w-md">
          <input
            className="text-black"
            type="text"
            name="description"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your review here"
          />
        </form>
      </div>
      <div className="flex justify-center pt-5">
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded md:rounded-lg"
          onClick={handleCreateReview}
        >
          Create a review
        </button>
      </div>
    </div>
  );
}

export default ReviewForm;
