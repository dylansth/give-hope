import React from 'react';
import Card from 'react-bootstrap/Card';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';

function Profile() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const username = data?.me?.username || [];

  if (loading) {
    return <div>Loading...</div>
  }
    return (

        <div>
            {Auth.loggedIn() ? (
                <>
                    <Card body>Your Profile: {username}</Card>
                </>
            ) : (
                <>
                    <Card body>View your fundraisers!</Card>
                </>
            )}
        </div>
    );
}

export default Profile;