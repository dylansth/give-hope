import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import '../styles/style.css'
import Countdown from '../components/Countdown';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const millisecondsToDateString = (milliseconds) => {
  const date = new Date();
  date.setTime(milliseconds);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return dateString;
};

function Explore() {



  const { loading, data } = useQuery(QUERY_CAMPAIGN
  );
  const campaignList = data?.campaigns || [];

  console.log(campaignList)

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });






  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap -m-4 justify-center ">
        {campaignList.map((campaign) => {
          // Format Money
          const moneyformatted = USDollar.format(campaign.targetAmount);
          // Format timer
          const milliseconds = campaign.endDate;
          const dateString = millisecondsToDateString(milliseconds);

          // Hover progress bar and see the amount 
          const tooltip = (
            <Tooltip id="tooltip">
              Current Amount: {`$${campaign.currentAmount}`}
            </Tooltip>
          );

          // Format % and color  progress bar
          const percentageDifference = (campaign.currentAmount / campaign.targetAmount) * 100;

          let variant = 'success';

          if (percentageDifference >= 65) {
            variant = 'success';
          } else if (percentageDifference >= 40) {
            variant = 'warning';
          } else {
            variant = 'danger';
          }

          // conditional rendering
          const today = Date.now();
          const isCampaignDisplaying = campaign.currentAmount < campaign.targetAmount;

          /// Thanks to https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer and Cam Sloan 
          const base64String = campaign.image.data;

          const binaryData = atob(base64String);

          // Create an array buffer from the binary data
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const view = new Uint8Array(arrayBuffer);
          for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
          }

          // Create a Blob object from the array buffer
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

          const imageUrl = URL.createObjectURL(blob);

          return (
            (isCampaignDisplaying) && (
              <div className="campaign-card sm:w-1/4 w-1/4 p-4 m-5 border-solid border-2 border-indigo-600" key={campaign.title}>
                <div className="h-80 relative bg-slate-400">
                  <img
                    alt="gallery"
                    className="w-full h-full object-cover object-center"
                    src={imageUrl}
                  />
                </div>
                <div className="campaign-text bottom-0 left-0 right-0 bg-gray-600 text-white p-0">
                  <h1 className="text-white title-font text-3xl font-medium mb-3 text-center">
                    {campaign.title}
                  </h1>
                  <p className="text-white leading-relaxed text-center">
                    🥅 Target Amount: {moneyformatted}
                  </p>
                  <div className="px-5 pb-2">
                    <OverlayTrigger placement="top" overlay={tooltip}>
                      <ProgressBar animated={true} max={campaign.targetAmount} now={campaign.currentAmount} label={`$${campaign.currentAmount}`} variant={variant} striped={true} />
                    </OverlayTrigger>
                  </div>
                  <div className="text-white leading-relaxed text-center">
                    <p>⌛End:<Countdown dateString={dateString} /></p>
                  </div>

                </div>
                <div>
                  $<input type="number" placeholder="amount" />
                  <button className="inline-block border-e p-3 text-gray-700 hover:bg-indigo-50 focus:relative tx-center"> Make a donation
                  </button>

                </div>
              </div>
            )
          )
        })};
      </div>
    </div>
  );
}


export default Explore;