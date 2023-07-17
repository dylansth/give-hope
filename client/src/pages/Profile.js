import React from 'react';
import Card from 'react-bootstrap/Card';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { DELETE_CAMPAIGN } from '../utils/mutations';
import Button from 'react-bootstrap/Button';

function Profile() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const [deleteCampaign, { error }] = useMutation(DELETE_CAMPAIGN);
  
    const username = data?.me?.username || [];
    const userCampaigns = data?.campaigns || [];
  
    const handleDeleteCampaign = async (campaignId) => {
      try {
        const { data } = await deleteCampaign({
          variables: { campaignId },
          // refetchQueries: update other queries in the application
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
    <div>
      {Auth.loggedIn() ? (
        <>
          <Card body>Your Profile: {username}</Card>
          <Card style={{ width: '18rem' }}>
            <Card.Header>Your Campaigns</Card.Header>
            <ListGroup variant="flush">
              {userCampaigns.map((campaign) => (
                <ListGroup.Item key={campaign._id}>
                  {campaign.title}{' '}
                  <Button 
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDeleteCampaign(campaign._id)}>
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
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
}

export default Profile;
