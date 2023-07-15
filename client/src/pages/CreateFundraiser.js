import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from '../utils/mutations';
// import '../styles/style.css'

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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createCampaign({
                variables: {
                    ...formData,
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

    return (
        <div>
            <h1>Create Campaign</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />

                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <label>endDate:</label>
                <input
                    type="text"
                    name="endDate"  // Updated field name
                    value={formData.endDate}
                    onChange={handleInputChange}
                />

                <label>Target Amount:</label>
                <input
                    type="text"
                    name="targetAmount"  // Updated field name
                    value={formData.targetAmount}
                    onChange={handleInputChange}
                />
                {/* Add more input fields for other campaign fields */}

                <button type="submit" className="bg-indigo-600 px-4 py-3 text-center text-sm">Create Campaign</button>
            </form>
        </div>
    );
};

export default CampaignForm;