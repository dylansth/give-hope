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
    const annualSalary = data?.me?.annualSalary || [];
    const userCampaigns = data?.campaigns || [];
    const donations = data?.me?.donatedCampaigns || [];

    console.log(donations)

    function divideSalary() {
        // Calculate 2% of the annual salary a
        const twoPercent = annualSalary * 0.02;

        return twoPercent;
    }
    const dividedSalaray = divideSalary(annualSalary);


    const handleDeleteCampaign = async (campaignId) => {
        try {
            const { data } = await deleteCampaign({
                variables: { campaignId },
                // refetchQueries: update other queries in the application
                // refetchQueries: [{ query: QUERY_GET_ME }],
            });
            console.log('Deleted campaign:', data.deleteCampaign);
            window.location.reload()
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
                   

                   <div className='mb-3 w-2/3 md:w-1/3 p-2 bg-white/[.66] border border-black flex justify-center mx-auto mt-3'>
                        <img src={GiveHopeLogoHome} alt="Give-Hope-Logo" />
                    </div>
                    <p className="mt-4 mx-auto text-center font-bold" >Hello {username.toUpperCase()}</p>
                  
                    <h3 className="font-bold py-4 pt-3 mx-auto text-center">
                        My Fundraisers
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

                            const hasDonations = campaign.donations.length > 0

                            return (

                                    <div key={campaign._id} className='hover:bg-white drop-shadow-lg bg-white/[.66] p-4 mx-auto items-center mb-12'>
                                        <Link style={{ textDecoration: 'none' }} to={`/fundraiser/${campaign._id}`}>
                                            <div className="">
                                                <img
                                                    alt="gallery"
                                                    className="h-full object-cover object-center"
                                                    src={imageUrl}
                                                />
                                            </div>
                                            <div className='pb-4 text-center'>
                                                <p>{campaign.title}</p>
                                            </div>
                                        </Link>
                                        <div className='flex justify-center'>
                                            <button
                                                className={`hover:bg-red-300 hover:ease-in-out duration-300 bg-gray border-2 border-red-800 justify-center p-1 px-3 rounded-xl ${hasDonations ? 'cursor-not-allowed' : ''}`}
                                                onClick={() => !hasDonations && handleDeleteCampaign(campaign._id)}
                                                disabled={hasDonations}>
                                                <ClearIcon className={`text-red-800 ${hasDonations ? 'opacity-50' : ''}`} />
                                                {hasDonations && <span className="tooltip-text">In progress</span>}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    <div>
                        <h3 className="py-2 mx-auto text-center">
                            Your Donations
                        </h3>
                        <DonationsProfile> </DonationsProfile>
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