import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import '../styles/style.css'
import Countdown from '../components/Countdown';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from 'react-router-dom'
import millisecondsToDateString from '../utils/getMilliseconds'
import createImageUrlFromBase64 from '../utils/imageConvert';




function Explore() {
  const { loading, data } = useQuery(QUERY_CAMPAIGN
  );
  const campaignList = data?.campaigns || [];

  if (loading) {
    return <div>Loading...</div>
  }

  console.log(campaignList)

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });



  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center ">
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

          const image = createImageUrlFromBase64(campaign.image.data)


          return (
            (isCampaignDisplaying) && (

              <div className="campaign-card sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 m-5 border-solid border-3 border-indigo-600" key={campaign.title}>
                <Link to={`/fundraiser/${campaign._id}`} key={campaign.title}>
                  <div className="h-80 relative bg-slate-400">
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
                    <p className="text-white leading-relaxed text-center">
                      🥅 Target Amount: {moneyformatted}
                    </p>
                    <div className="px-5 pb-2">
                      <OverlayTrigger placement="top" overlay={tooltip}>
                        <ProgressBar animated={true} max={campaign.targetAmount} now={campaign.currentAmount} label={<span className="custom-label"> {`$${campaign.currentAmount}`}</span>} variant={variant} striped={true} />
                      </OverlayTrigger>
                    </div>
                    <div className="text-white leading-relaxed text-center">
                      <p>⌛End:</p><Countdown dateString={dateString} />
                    </div>

                  </div>
                </Link>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
export default Explore;