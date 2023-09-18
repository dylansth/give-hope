import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation } from '@apollo/client';
import { UPDATE_CAMPAIGN } from '../utils/mutations';
import millisecondsToDateString from '../utils/getMilliseconds';
// import { useNavigate } from 'react-router-dom';

function CampaignEdit({ campaign }) {

  // const navigate = useNavigate()
  const [updateCampaign, { error }] = useMutation(UPDATE_CAMPAIGN);
  const { _id, title, description, targetAmount, endDate } = campaign;

  console.log(campaign._id)

  const [formData, setFormData] = useState({
    title,
    description,
    targetAmount,
    endDate: new Date(millisecondsToDateString(campaign.endDate)),
  });

  const handleEditCampaign = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateCampaign({
        variables: {
          id: campaign._id,
          campaignData: {
            title: formData.title,
            description: formData.description,
            endDate: formData.endDate, 
            targetAmount: parseInt(formData.targetAmount, 10),
          },
        },
      });
      console.log('Campaign edited:', data);
      // navigate('/me')
      window.location.reload()
    } catch (err) {
      console.error('Error editing campaign:', err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateInputChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: date,
    }));
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Editing Campaign</h1>
      <form onSubmit={handleEditCampaign}>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="title">Title:</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="description">Description:</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">End Date:</label>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            name="endDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            selected={formData.endDate}
            value={formData.endDate}
            onChange={handleDateInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="targetAmount">Target Amount:</label>
          <input
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleInputChange}
          />
        </div>
        <button
          className={`hover:bg-red-300 hover:ease-in-out duration-300 bg-gray border-2 border-red-800 justify-center p-1 px-3 rounded-xl`}
          type="submit"
        >
          Save changes
        </button>
      </form>
      {error && <div className="error-message">{error.message}</div>}
    </div>
    </div>
  );
}

export default CampaignEdit;
