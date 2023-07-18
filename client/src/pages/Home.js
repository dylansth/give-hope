import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

import HomeSVG from '../assets/home-picture.svg'

import '../styles/style.css'

function Home() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const username = data?.me?.username || [];

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className='text-center'>
            <div className="typewriter-text">
                <h1 className='text-center p-5'>🕊️ Give Hope, Uniting Hearts 💖</h1>
            </div>
            {Auth.loggedIn() ? (
                <div>
                    <p className="ml-4 text-2xl font-semibold">
                        Welcome, {username.toUpperCase()}
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

            <div className="h-60 flex flex-col justify-end border-y-2 border-y-black" style={{ backgroundImage: `url(${HomeSVG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* <img src="home-picture.svg" alt="" /> */}
                <div className='bg-white/[.50] text-center'>
                    <h2 className="font-bold text-3xl"> Every Donation Matters. </h2>
                    <p className="font-medium text-lg">
                        1% of your income can change someones life.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;