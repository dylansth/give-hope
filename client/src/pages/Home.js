import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

import bulletpoint1 from "../assets/bulletpoint1.svg"
import bulletpoint2 from "../assets/bulletpoint2.svg"
import bulletpoint3 from "../assets/bulletpoint3.svg"
import GiveHopeLogoHome from '../assets/givehopehomelogo.svg'
import HomeBannerHeader from '../assets/homebanner.svg'
import cardheader1 from '../assets/cardheader1.svg'
import cardheader2 from '../assets/cardheader2.svg'
import cardheader3 from '../assets/cardheader3.svg'
import cardheader4 from '../assets/cardheader4.svg'
import worldandjar from '../assets/donationjar.png'
import burgerandgrocery from '../assets/burgerandgrocery.svg'

function Home() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const username = data?.me?.username || [];

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className=''>
                <div className='pt-4 pb-6 border-b-2 border-black bg-blue-400 flex flex-col justify-between items-center bg-repeat-x bg-center bg-contain'
                    style={{ backgroundImage: `url(${HomeBannerHeader})` }}>
                    <div className='mb-3 w-2/3 md:w-1/3 p-2 bg-white/[.66] border border-black flex justify-center'>
                        <img src={GiveHopeLogoHome} alt="Give-Hope-Logo" />
                    </div>
                </div>
            </div>

            <div className='text-center bg-blue-200 pt-6 px-2'>
                {Auth.loggedIn() ? (
                    <div>
                        <p className="text-2xl font-semibold">
                            Welcome, {username.toUpperCase()}
                        </p>
                    </div>
                ) : (
                    <div className="">
                        <p>
                            Welcome! Please <Link to="/sign-in">Sign In</Link> Or{' '}
                            <Link to="/sign-up">Sign Up</Link> to Donate or Create a Fundraiser.
                        </p>
                    </div>
                )}
            </div>

            <div className='bg-blue-200 text-center'>
                <p className='font-xl font-bold pt-6'>
                    Your Contribution Matters.
                </p>
                <img src={worldandjar} alt="donation jar and world map" className='py-1 sm:w-2/3 md:w-1/3 mx-auto' />
                <div className='text-center py-4 px-4 bg-blue-200'>
                    <p className='font-semibold'>
                        Create Impact with any Amount
                    </p>
                    <p>
                        We empower those in need by fundraising based on weekly goals with a manageable and meaningful dollar amount.
                    </p>
                    <p>
                        You are control. GiveHope provides the freedom to contribute any dollar amount to any campaign that resonates with you.
                    </p>
                    <p className='font-bold pt-4'>
                        Bridge the Gap Between Economies While Uplifting Lives
                    </p>
                </div>
            </div>

            <div className=''>
                <div className="h-60 bg-bottom bg-blue-400 flex flex-col justify-end border-y-2 border-y-black bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${burgerandgrocery})` }}>
                    <div className='bg-white/[.40] text-center pt-3 px-2'>
                        <p className="font-medium text-lg">
                            The Price of a Burger Could Provide Someone Nutritious Groceries for a Week.
                        </p>
                    </div>
                </div>
            </div>
            <div className='pb-6 pt-3 bg-blue-200 border-b-2 border-b-black'>
                <p className='text-center mt-4 font-bold'>
                    Fundraising with GiveHope
                </p>
                <div className='flex items-center'>
                    <img src={bulletpoint1} alt="bullet point"
                        className="w-8 ml-2"
                    />
                    <p className='mt-4 mx-2 pb-2'>
                        Create an account and Select Create Fundraiser to begin creating your campaign
                    </p>
                </div>
                <div className='flex items-center'>
                    <img src={bulletpoint2} alt="bullet point"
                        className="w-8 ml-2"
                    />
                    <p className='mt-4 mx-2 pb-2'>
                        Tell your story and select your needed amount.
                    </p>
                </div>
                <div className='flex items-center'>
                    <img src={bulletpoint3} alt="bullet point"
                        className="w-8 ml-2"
                    />
                    <p className='mt-4 mx-2 mb-4'>
                        Begin collecting donations! View and respond to comments from donars.
                    </p>
                </div>
            </div>
            <div className="bg-blue-400 px-4 py-6 grid md:grid-cols-2 lg:grid-cols-4 text-center gap-4">
                <div className="mt-2 bg-white/[.50] border border-black rounded-lg px-2">
                    <p className="mt-3 font-bold">
                        Sponsorship
                    </p>
                    <img src={cardheader1} alt="sponsorship header" className='w-2/3 mx-auto'/>
                    <p className="mt-1 mx-2">
                        Sponsorship provides a unique opportunity to make a profound impact in the lives of those in need. The act of sponsoring not only offers direct support but also fosters a sense of connection and shared responsibility.
                    </p>
                </div>
                <div className="mt-2 bg-white/[.50] border border-black rounded-lg px-2">
                    <p className="mt-3 font-bold">
                        Our Vision
                    </p>
                    <img src={cardheader2} alt="sponsorship header" className='w-2/3 mx-auto'/>
                    <p className="mt-1 mx-2">
                        At GiveHope, we hold a fundamental belief that every contribution, no matter its size, has the power to create meaningful change. Our vision is to establish a platform where everyone can come together to make a difference.
                    </p>
                </div>
                <div className="mt-2 bg-white/[.50] border border-black rounded-lg px-2">
                    <p className="mt-3 font-bold">
                        Why GiveHope?
                    </p>
                    <img src={cardheader3} alt="sponsorship header" className='w-2/3 mx-auto'/>
                    <p className="mt-1 mx-2">
                        GiveHope is non-profit, and your contributions go straight to verified causes. At GiveHope, your donations are channeled directly to those in need. We're committed to ensuring that your support brings direct and meaningful change to the lives and communities you care about.
                    </p>
                </div>
                <div className="mt-2 bg-white/[.50] border border-black rounded-lg px-2">
                    <p className="mt-3 font-bold">
                        Process
                    </p>
                    <img src={cardheader4} alt="sponsorship header" className='w-2/3 mx-auto'/>
                    <p className="mt-1 mx-2">
                        At GiveHope, making a difference is easy. Once your account is created, browse through a variety of campaigns from anywhere in the world. Everyone is free to interact with each other, comment on campaigns to connect with those in need or like-minded individuals who share your passion for positive change.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Home;