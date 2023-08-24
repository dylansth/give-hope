import React from 'react';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { DELETE_CAMPAIGN } from '../utils/mutations';
import DonationsProfile from '../components/DonationsProfile';
import GiveHopeLogoHome from '../assets/givehopehomelogo.svg';
import ClearIcon from '@mui/icons-material/Clear';

function Profile() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const [deleteCampaign, { error }] = useMutation(DELETE_CAMPAIGN);

    const username = data?.me?.username || [];
    const userId = data?.me?._id || [];
    // const annualSalary = data?.me?.annualSalary || [];
    const userCampaigns = data?.campaigns || [];
    const donations = data?.me?.donatedCampaigns || [];

    console.log(donations)

    // function divideSalary() {
        // Calculate 2% of the annual salary
        // const twoPercent = annualSalary * 0.02;

    //     return twoPercent;
    // }
    // const dividedSalaray = divideSalary(annualSalary);


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
        <div className='bg-blue-200'>
            {Auth.loggedIn() ? (
                <div>
                   

                        <p className="mt-4 mx-auto text-center" >Hello {username}</p>
                        <p className="mx-auto text-center" > Your Annual Salary: {annualSalary}</p>
                        <p className="mx-auto text-center" > 2% of your Annual Salary is {dividedSalaray}</p>

                        <h3 className="py-2 mx-auto text-center">
                            Your Campaigns
                        </h3>


                    <div className='flex flex-row flex-wrap justify-center'>
                        {userCampaigns.filter(campaign => campaign.creatorId._id === userId).map((campaign) => {
                            const base64String = campaign.image.data;
                            const binaryData = atob(base64String);

                            const arrayBuffer = new ArrayBuffer(binaryData.length);
                            const view = new Uint8Array(arrayBuffer);
                            for (let i = 0; i < binaryData.length; i++) {
                                view[i] = binaryData.charCodeAt(i);
                            }

                            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
                            const imageUrl = URL.createObjectURL(blob);

                            return (

                                <div className='grid md:grid-cols-1 mx-6'>
                                    <Link style={{textDecoration: 'none'}} to={`/fundraiser/${campaign._id}`}>
                                        <div key={campaign._id} className='hover:bg-white drop-shadow-lg bg-white/[.66] p-4 mx-auto items-center mb-12'>
                                            <div className="">
                                                <img
                                                    alt="gallery"
                                                    className="h-full object-cover object-center"
                                                    src={imageUrl}
                                                />
                                                    </div>
                                            <div className='pb-4 text-center'>
                                                <p>{campaign.title}</p>
                                                <div className=''>
                                                    <button
                                                        className="hover:bg-red-300 hover:ease-in-out duration-300 bg-gray border-2 border-red-800 p-1 px-3 rounded-xl"
                                                        onClick={() => handleDeleteCampaign(campaign._id)}>
                                                        <ClearIcon className='text-red-800'/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            );
                        })}
                    </div>
                    

                    <div>
                        <h3 className="py-2 mx-auto text-center">
                            Your Donations
                        </h3>
                        <DonationsProfile></DonationsProfile>
                    </div>
                </div>

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