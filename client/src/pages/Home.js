import React from 'react';
import Card from 'react-bootstrap/Card';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';

import '../styles/style.css'

function Home() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const username = data?.me?.username || [];

  if (loading) {
    return <div>Loading...</div>;
  }
    return (

        <div>
            {Auth.loggedIn() ? (
                <>
                    <Card body>Welcome to GiveHope {username}</Card>
                </>
            ) : (
                <>
                    <Card body>Log In or Sign Up to Start a Fundraiser or Begin Donating</Card>
                </>
            )}
        </div>
    );
}

export default Home;