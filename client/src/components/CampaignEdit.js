// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import { useMutation } from '@apollo/client';
// import { UPDATE_CAMPAIGN } from '../utils/mutations';
// import millisecondsToDateString from '../utils/getMilliseconds';
// // import { useNavigate } from 'react-router-dom';


// function CampaignEdit({ campaign }) {

//   // const navigate = useNavigate()
//   const [updateCampaign, { error }] = useMutation(UPDATE_CAMPAIGN);
//   const { _id, title, description, targetAmount, endDate } = campaign;

//   console.log(campaign._id)

//   const [formData, setFormData] = useState({
//     title,
//     description,
//     targetAmount,
//     endDate: new Date(millisecondsToDateString(campaign.endDate)),
//   });

//   const handleEditCampaign = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await updateCampaign({
//         variables: {
//           id: campaign._id,
//           campaignData: {
//             title: formData.title,
//             description: formData.description,
//             endDate: formData.endDate, 
//             targetAmount: parseInt(formData.targetAmount, 10),
//           },
//         },
//       });
//       console.log('Campaign edited:', data);
//       // navigate('/me')
//       window.location.reload()
//     } catch (err) {
//       console.error('Error editing campaign:', err);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleDateInputChange = (date) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       endDate: date,
//     }));
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center mt-8">
//       <h1 className="text-2xl font-bold mb-4">Editing Campaign</h1>
//       <form onSubmit={handleEditCampaign} className='flex flex-wrap flex-col'>
//         <div className="mb-4">
//           <label className="block font-semibold mb-1" htmlFor="title">Title:</label>
//           <input
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//         <label className="block font-semibold mb-1" htmlFor="description">Description:</label>
//           <textarea
//             name="description"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 h-full resize-y"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-semibold mb-1">End Date:</label>
//           <DatePicker
//             dateFormat="yyyy/MM/dd"
//             name="endDate"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//             selected={formData.endDate}
//             value={formData.endDate}
//             onChange={handleDateInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-semibold mb-1" htmlFor="targetAmount">Target Amount:</label>
//           <input
//            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//             type="number"
//             name="targetAmount"
//             value={formData.targetAmount}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button
//           className={`hover:bg-red-300 hover:ease-in-out duration-300 bg-gray border-2 border-red-800 justify-center p-1 px-3 rounded-xl`}
//           type="submit"
//         >
//           Save changes
//         </button>
//       </form>
//       {error && <div className="error-message">{error.message}</div>}
//     </div>
//     </div>
//   );
// }

// export default CampaignEdit;


import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation } from '@apollo/client';
import { UPDATE_CAMPAIGN } from '../utils/mutations';
import millisecondsToDateString from '../utils/getMilliseconds';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';


function CampaignEdit({ campaign }) {
  const [updateCampaign, { error }] = useMutation(UPDATE_CAMPAIGN);
  const { _id, title, description, targetAmount, endDate } = campaign;

  const [formData, setFormData] = useState({
    title,
    description,
    targetAmount,
    endDate: new Date(millisecondsToDateString(campaign.endDate)),
  });

  // State to manage the modals for each input field
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);

  const openTitleModal = () => {
    setIsTitleModalOpen(true);
  };

  const closeTitleModal = () => {
    setIsTitleModalOpen(false);
  };

  const handleEditTitle = async () => {
    try {
      const { data } = await updateCampaign({
        variables: {
          id: campaign._id,
          campaignData: {
            title: formData.title,
            description: formData.description,
            endDate: formData.endDate.toISOString(),
            targetAmount: parseInt(formData.targetAmount, 10),
          },
        },
      });
      console.log('Campaign edited:', data);
      closeTitleModal();
      window.location.reload()
    } catch (err) {
      console.error('Error editing title:', err);
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
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


        {/* Edit Title Modal */}
        <button
          onClick={openTitleModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Edit Campaign
        </button>
        <Modal appElement={document.getElementById('root')}
          isOpen={isTitleModalOpen}
          onRequestClose={closeTitleModal}
          contentLabel="Edit Title Modal"
          className="Modal flex flex-wrap flex-col place-content-around  m-5 "
        >
          <div className='flex flex-wrap flex-col justify-center'>
            <h2 className='flex flex-wrap justify-center'>Title</h2>
            <input
              type="text"
              name="title"
              className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 flex flex-wrap justify-center"
              value={formData.title}
              onChange={handleTitleChange}
            />
            <h2 className='flex flex-wrap justify-center'>Description</h2>
            <textarea
              name="description"
              className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 h-48 resize-y flex flex-wrap justify-center"
              value={formData.description}
              onChange={handleTitleChange}
            />
            <h2 className='flex flex-wrap justify-center'>End Date</h2>
            <div className="date-picker-container ">
              <div className="relative">
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  name="endDate"
                  className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 flex flex-wrap justify-center z-10 cursor-pointer"
                  selected={formData.endDate}
                  value={formData.endDate}
                  onChange={handleDateInputChange}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2  z-0">
                  <FaCalendar className="text-gray-500 text-lg  z-0" />
                </div>
              </div>
            </div>


            <h2 className='flex flex-wrap justify-center'>Target Amount</h2>
            <input
              className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 flex flex-wrap justify-center"
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleTitleChange}
            />
          </div>
          <div className='flex flex-wrap flex-col justify-center m-5'>
            <button
              onClick={handleEditTitle}
              className={`hover:bg-green-300 hover:ease-in-out duration-300 bg-gray border-2 border-green-800 justify-center font-bold p-1 px-3 rounded-xl`}
              type="button"
            >
              Save changes
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CampaignEdit;



