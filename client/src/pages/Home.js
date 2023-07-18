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
       <div>
      <p className='text-center text-5xl text-white p-2'>
      <span className="typewriter-text">🕊️ Give Hope, Uniting Hearts 💖 </span>
      </p>
    </div>
            {Auth.loggedIn() ? (
                <div>
                        <p className='p-home pb-2'>
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