import React from 'react';
import Card from 'react-bootstrap/Card';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { DELETE_CAMPAIGN } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import '../styles/style.css';

function Profile() {
  const { data, loading } = useQuery(QUERY_GET_ME);
  const [deleteCampaign, { error }] = useMutation(DELETE_CAMPAIGN);

  const username = data?.me?.username || [];
  const userCampaigns = data?.campaigns || [];

  const handleDeleteCampaign = async (campaignId) => {
    try {
      const { data } = await deleteCampaign({
        variables: { campaignId },
        refetchQueries: [{ query: QUERY_GET_ME }],
      });
      console.log('Deleted campaign:', data.deleteCampaign);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap -m-4 justify-center">
        {userCampaigns.map((campaign) => {
          const base64String = campaign.image.data;
          const binaryData = atob(base64String);

          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const view = new Uint8Array(arrayBuffer);
          for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);

          return (
            
              <div className="profile-card sm:w-1/4 w-1/4 p-4 m-5 border-solid border-3 border-indigo-600" key={campaign._id}>
              {Auth.loggedIn() ? (
                
                <>
               
                  {/* <Card body className="bg-gray-200 p-4 mb-4">
                    Your Profile: {username}
                  </Card> */}
                
                  <Card className="bg-white w-72">
                  <div className="h-80 relative bg-slate-400">
                          <img
                            alt="gallery"
                            className="w-full h-full object-cover object-center"
                            src={imageUrl}
                          />
                        </div>
                    {/* <Card.Header className="bg-gray-200 py-2 px-4">Your Campaigns</Card.Header> */}
                    <ListGroup variant="flush">
                      <ListGroup.Item className="text-black title-font text-3xl font-medium mb-3 text-center">
                        {campaign.title}
                    <div className='pt-5 text-base'>
                        <Button
                          variant="danger"
                          className="ml-2"
                          onClick={() => handleDeleteCampaign(campaign._id)}
                        >
                          Delete
                        </Button>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                    <p className='text-center italic font-bold' >By: {username} </p>
                  </Card>
                 
                </>
              ) : (
                <>
                  <p>
                    Please <Link to="/sign-in">Sign In</Link> Or{' '}
                    <Link to="/sign-up">Sign Up</Link> to View your Profile.
                  </p>
                </>
              )}
              {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
