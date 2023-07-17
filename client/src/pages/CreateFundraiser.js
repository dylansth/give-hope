import React, { useState } from 'react';
import { useMutation, useApolloClient, useQuery } from '@apollo/client';
import { CREATE_CAMPAIGN } from '../utils/mutations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { QUERY_GET_ME } from '../utils/queries';


const CampaignForm = () => {
  const { data, loading } = useQuery(QUERY_GET_ME);
  const username = data?.me?._id || [];

  console.log(username)

  const client = useApolloClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    endDate: '',
    targetAmount: '',
    image: { data: '', contentType: '' },
    
  });

  const [createCampaign] = useMutation(CREATE_CAMPAIGN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'targetAmount') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    } else if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: {
          ...prevData.image,
          data: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  console.log('Context:', client);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submit triggered');
    try {
      const { data } = await createCampaign({
        variables: {
          campaignData: {
            title: formData.title,
            description: formData.description,
            image: {
              data: formData.image,
              contentType: 'image/jpeg',
            },
            endDate:formData.endDate,
            targetAmount:parseInt(formData.targetAmount),
          },
        },
      });

      console.log('Form data:', formData); // Log form data before reset
      console.log('Response data:', data);

      // Reset the form
      setFormData({
        title: '',
        description: '',
        endDate: '',
        targetAmount: '',
        image: { data: '', contentType: 'image/jpeg' },
        // Reset other fields as well
      });
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  // Handle image
  const [image, setImage] = useState('');

  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      console.log(reader.result); // string to save in MongoDB
      setImage(reader.result);
      setFormData((prevData) => ({
        ...prevData,
        image: {
          ...prevData.image,
          data: reader.result,
        },
      }));
    };

    reader.onerror = (error) => {
      console.log('Error:', error);
    };
  }

  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date) => {
    setEndDate(date);
  };

  const handleDateInputChange = (date) => {
    setEndDate(date);
    setFormData((prevData) => ({
      ...prevData,
      endDate: date,
    }));
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Campaign</h1>
      <form onSubmit={handleFormSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="title">
            Title:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter a title"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="description">
            Description:
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter a description"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="endDate">
            End Date:
          </label>
          <DatePicker
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            selected={endDate}
            name="endDate"
            value={formData.endDate}
            onChange={handleDateInputChange}
            placeholder="Enter an end date"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="targetAmount">
            Target Amount:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleInputChange}
            placeholder="Enter a target amount"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="image">
            Upload your image:
          </label>
          <input
            accept="image/*"
            type="file"
            name="image"
            onChange={convertToBase64}
            className="mb-2"
            placeholder="Choose an image"
          />
          {image !== '' && (
            <img
              src={image}
              alt="Uploaded"
              className="w-24 h-24 rounded-md"
            />
          )}
        </div>
        {/* Add more input fields for other campaign fields */}
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
