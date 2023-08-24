import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import Countdown from '../components/Countdown';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import millisecondsToDateString from '../utils/getMilliseconds';
import createImageUrlFromBase64 from '../utils/imageConvert';
import '../styles/style.css';
import CampaignReviews from '../components/CampaignReviews';
import CampaignDonations from '../components/CampaignDonations';
import ReviewForm from '../components/ReviewForm'
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';



function Fundraiser() {
  const { campaignId } = useParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_CAMPAIGN, {
    variables: { campaignId: campaignId },
  });

  const [views, setReview] = useState([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.campaigns) {
    return <div>Campaign not found or an error occurred.</div>;
  }

  const campaign = data.campaigns.find((campaign) => campaign._id === campaignId);

  if (!campaign) {
    return <div>Campaign not found.</div>;
  }

console.log(campaign)


  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const moneyformatted = USDollar.format(campaign.targetAmount);

  const milliseconds = campaign.endDate;
  const dateString = millisecondsToDateString(milliseconds);

  const tooltip = (
    <Tooltip id="tooltip">
      Current Amount: {`$${campaign.currentAmount}`}
    </Tooltip>
  );

  const percentageDifference = (campaign.currentAmount / campaign.targetAmount) * 100;
  let variant = 'success';

  if (percentageDifference >= 65) {
    variant = 'success';
  } else if (percentageDifference >= 40) {
    variant = 'warning';
  } else {
    variant = 'danger';
  }

  const image = createImageUrlFromBase64(campaign.image.data);

  const review = campaign.reviews;

  console.log(review)

  const donation = campaign.donations;

  console.log(donation)


  const token = localStorage.getItem('id_token');

  const isAuthenticated = token ? true : false;


  const handleReviewCreate = (newReview) => {
    setReview([
      ...views,
      { description: newReview }
    ]);
  };
  const handleDonate = (title, campaignId, selectedAmount) => {
    const parsedAmount = parseFloat(selectedAmount);
    const donation = {
      campaignId: campaignId,
      donorId: Auth.getProfile().data._id,
      amount: isNaN(parsedAmount) ? 0 : parsedAmount
    };
    localStorage.setItem("donation", JSON.stringify(donation));
  
    navigate("/checkout", {
      state: {
        amount: isNaN(parsedAmount) ? 0 : parsedAmount,
        title: campaign.title,
        campaignId: campaign._id
      }
    });
  };

  
  
  
  
  const handleChange = (event) => {

    if (event.target.name === "amount") {
      const inputValue = parseFloat(event.target.value);
      setAmount(isNaN(inputValue) ? 0 : inputValue);
    }
  };

  // const donationOptions = [10, 15, 20, 30, 50];

  return (
    <div className="single-campaign flex justify-center">
      <div className="campaign-card p-4 m-5 border-solid border-3 border-indigo-600">
        <div className="relative bg-slate-400">
          <img
            alt="gallery"
            className="w-full h-full object-cover object-center"
            src={image}
          />
        </div>
        <div className="campaign-text bottom-0 left-0 right-0 bg-sky-600 text-white p-0">
          <h1 className="text-white title-font text-3xl font-medium mb-3 text-center">
            {campaign.title}
          </h1>
          <div className='flex justify-center m-2'>
            <p>{campaign.description}</p>
          </div>
          <p className="text-white leading-relaxed text-center">
            🥅 Target Amount: {moneyformatted}
          </p>
          <div className="px-5 pb-2">
            <OverlayTrigger placement="top" overlay={tooltip}>
              <ProgressBar
                animated={true}
                max={campaign.targetAmount}
                now={campaign.currentAmount}
                label={<span className="custom-label"> {`$${campaign.currentAmount}`}</span>}
                variant={variant}
                striped={true}
              />
            </OverlayTrigger>
          </div>
          <div>

          </div>
          <div className="text-white leading-relaxed text-center">
            <p>⌛End:</p>
            <Countdown dateString={dateString} />
          </div>
{/* Donation section */}
        {isAuthenticated ?
          <div className='flex justify-center'>
        
            <button
              className="inline-block p-2 bg-blue-800 text-white-700 hover:bg-pink-50 hover:text-black focus:relative tx-center m-3"
              onClick={() => handleDonate(campaign.title)}
            >
            Donate!
            </button>

        </div> : <p className='text-center'> If you want to make a donation, please <Link className='text-black m-2' to="/sign-in">Sign In</Link> or{' '}
                        <Link className='text-black m-2' to="/sign-up">Sign Up</Link></p>}


          {/* Review Input */}
        </div>
        <Accordion>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Reviews</Accordion.Header>
            <Accordion.Body>
              {isAuthenticated && (
                <div>
                  <ReviewForm onReviewCreate={handleReviewCreate} campaignId={campaign._id} />
                </div>
              )}
              {review.length > 0 ? <CampaignReviews reviews={review} /> : <p>This campaign does not have reviews. If you want to create a review, please <Link to="/sign-in">Sign In</Link> Or{' '}
                        <Link to="/sign-up">Sign Up</Link>.</p>}

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Donations</Accordion.Header>
            <Accordion.Body>
             
              {donation.length > 0 ? <CampaignDonations donations={donation} /> : <p>This campaign does not have donations.</p>}

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </div>

      
    </div>
  );
}

export default Fundraiser;
