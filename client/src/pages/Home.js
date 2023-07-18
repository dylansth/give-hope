import React from 'react';
import Card from 'react-bootstrap/Card';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

import '../styles/style.css'

function Home() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const username = data?.me?.username || [];

    if (loading) {
        return <div>Loading...</div>
    }
    return (

        <div>
            {Auth.loggedIn() ? (
                <>
                    <Card body>Welcome to GiveHope {username}</Card>
                </>
            ) : (
                <>
                    <Card body><p>
                        Please <Link to="/sign-in">Sign In</Link> Or{' '}
                        <Link to="/sign-up">Sign Up</Link> to Donate or Create a Fundraiser.
                    </p></Card>
                </>
            )}
        </div>
    );
}

export default Home;