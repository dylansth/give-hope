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
    image: { data: '', contentType: 'image/jpeg' },
    
  });

  const [createCampaign] = useMutation(CREATE_CAMPAIGN);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const { data } = await createCampaign({
        variables: {
          campaignData: {
            title: formData.title,
            description: formData.description,
            image: {
              data: formData.image.data,
              contentType: 'image/jpeg',
            },
            endDate:formData.endDate,
            targetAmount: parseInt(formData.targetAmount, 10),
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
      window.location.href = 'http://localhost:3000/'
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  // Handle image
  const [image, setImage] = useState('');

  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
   console.log(e.target, 'event picture')
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Extract the base64 string without the prefix
      setImage(reader.result);
      setFormData((prevData) => ({
        ...prevData,
        image: {
          // ...prevData.image,
          data: base64String,
          contentType: 'image/jpeg'
        },
      }));
    };
  
    reader.onerror = (error) => {
      console.log('Error:', error);
    };
  }

  const [endDate, setEndDate] = useState(null);

  const handleDateInputChange = (date) => {
    setEndDate(date);
    const formattedDate = date ? date.toISOString().slice(0, 10).replace(/-/g, '/') : '';
    setFormData((prevData) => ({
      ...prevData,
      endDate: formattedDate,
    }));
    console.log(date);
  };
  

// button - form
  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.endDate &&
      formData.targetAmount &&
      image !== ''
    );
  };
  
  
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Campaign</h1>
      <form onSubmit={handleFormSubmit} className="w-80 max-w-md">
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="title">
            Title:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title:e.target.value})}
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
            onChange={(e) => setFormData({...formData, description:e.target.value})}
            placeholder="Enter a description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="endDate">
            End Date:
          </label>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            selected={endDate}
            name="endDate"
            value={formData.endDate}
            onChange={(e) => handleDateInputChange(e)}
            placeholder="Enter an end date"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="targetAmount">
            Target Amount:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                targetAmount: parseInt(e.target.value, 10),
              })
            }
            placeholder="Enter a target amount"
            required
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
            onChange={(e) => convertToBase64 (e)}
            className="mb-2"
            placeholder="Choose an image"
            required
          />
          {image !== '' && (
            <img
              src={image}
              alt="Uploaded"
              className="w-24 h-24 rounded-md"
            />
          )}
        </div>
    <div className="flex justify-center">
        <button
        disabled={!isFormValid()} 
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 mb-3"
        >
          Create Campaign
        </button>

      </div>
      
        {!isFormValid() && (
  <p className="text-red-500 text-center p-2">Please fill in all the required fields before submitting.</p>
)}
      </form>
    </div>
  );
};

export default CampaignForm;
