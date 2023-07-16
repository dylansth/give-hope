import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from '../utils/mutations';



const CampaignForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        endDate: '',
        targetAmount: '',
        image: ''
        // Add more fields here according to your requirements
    });

    const [createCampaign] = useMutation(CREATE_CAMPAIGN);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "targetAmount") {
            setFormData({
                ...formData,
                [event.target.name]: parseInt(event.target.value)
            })

        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

        }
    }



    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createCampaign({
                variables: {
                    campaignData: formData,
                },
            });
            console.log(data); // Handle success response

            // Reset the form
            setFormData({
                title: '',
                description: '',
                endDate: '',
                targetAmount: '',
                image: ''
                // Reset other fields as well
            });
        } catch (error) {
            console.error(error); // Handle error response
        }
    };


    // Handle image
    const [image, setImage] = useState("");

    function convertToBase64(e) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    
      reader.onload = () => {
        console.log(reader.result); // string to save in MongoDB
        setImage(reader.result);
      };
    
      reader.onerror = (error) => {
        console.log("Error:", error);
      };
    }

    return (
        <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-4">Create Campaign</h1>
        <form onSubmit={handleFormSubmit} className="w-full max-w-md">
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
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="endDate">End Date:</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="targetAmount">Target Amount:</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="targetAmount"
              defaultValue={formData.targetAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="image">Upload your image:</label>
            <input
              accept="image/*"
              type="file"
              name="image"
              defaultValue={formData.image}
              onChange={convertToBase64}
              className="mb-2"
            />
            {image !== "" && (
              <img src={image} alt="Uploaded" className="w-24 h-24 rounded-md" />
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