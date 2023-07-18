import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import '../styles/style.css'

function Home() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const username = data?.me?.username || [];

    if (loading) {
        return <div>Loading...</div>
    }
    return (

        <Container fluid>
            <h1 class="my-6 ml-6">
                GiveHope
            </h1>
            {Auth.loggedIn() ? (
                <div>
                        <p>
                            Welcome, {username}
                        </p>
                </div>
            ) : (
                <div className="mt-4">
                        <p>
                            Welcome! Please <Link to="/sign-in">Sign In</Link> Or{' '}
                            <Link to="/sign-up">Sign Up</Link> to Donate or Create a Fundraiser.
                        </p>
                </div>
            )}
        </Container>
    );
}

export default Home;