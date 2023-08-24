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
                        <div key={donation.createdAt} className='flex flex-col justify-center items-center py-2 border-2 border-black rounded-xl w-1/3 m-5'>
                            <p className='font-bold'>Campaign: {donation.campaignId.title}</p>
                            <p className='font-bold'>Amount: ${donation.amount}</p>
                            <p className='font-bold'>Donated:{donation.createdAt}</p>
                        
                        </div>
                    );
                })}
            </div>
       
    );

}
    

export default DonationsProfile;