import React from 'react';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { DELETE_CAMPAIGN } from '../utils/mutations';

function Profile() {
    const { data, loading } = useQuery(QUERY_GET_ME);
    const [deleteCampaign, { error }] = useMutation(DELETE_CAMPAIGN);

  const username = data?.me?.username || [];
  const userCampaigns = data?.campaigns || [];

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
        <div>
            {Auth.loggedIn() ? (
                <div className='flex flex-col'>

                    <p className="mt-4 mx-auto" >Hello {username}</p>
                    <p className="mx-auto" > Your Annual Salary: {annualSalary}</p>
                    <p className="mx-auto" > 2% of your Annual Saray is {dividedSalaray}</p>

                    <h3 className="py-2 mx-auto">
                    Your Campaigns
                    </h3>

                    {userCampaigns.map((campaign) => (
                        <div key={campaign._id} className='flex flex-col justify-center items-center py-2 border-2 border-black rounded-xl w-1/3 mx-auto my-2'>
                            <p>{campaign.title}</p>
                            <button
                                className="bg-red-600 w-1/4 rounded-xl"
                                onClick={() => handleDeleteCampaign(campaign._id)}>
                                Delete
                            </button>
                        </div>

                    ))}

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
