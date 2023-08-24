import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';


function DonationsProfile() {
    const { data, loading } = useQuery(QUERY_GET_ME);

    const donations = data?.me?.donatedCampaigns || [];





    return (
       

     <div className='flex flex-row flex-wrap justify-center	'>
                {donations.map((donation) => {

                    return (
                        <div key={donation.createdAt} className='hover:bg-white drop-shadow-lg bg-white/[.66] p-4 mx-auto items-center mb-12'>
                            <p className='font-bold text-center'>You donated ${donation.amount} to {donation.campaignId.title} by {donation.createdAt}</p> 
                        </div>
                    );
                })}
            </div>
       
    );

}
    

export default DonationsProfile;