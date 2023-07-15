import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import '../styles/style.css'
import Countdown from '../components/Countdown';

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
      const milliseconds = campaign.endDate
      const dateString = millisecondsToDateString(milliseconds);
      console.log(dateString)

      
      return (
        <div className="sm:w-1/4 w-full p-4 m-5 border-solid border-2 border-indigo-600" key={campaign.title}>
          <div className="h-80 relative bg-slate-400">
            <img
              alt="gallery"
              className="w-full h-full object-cover object-center"
              src={campaign.image}
            />
          </div>
          <div className="bottom-0 left-0 right-0 px-5 py-5 bg-gray-600 text-white">
            <h1 className="text-white title-font text-lg font-medium mb-3 text-center">
              {campaign.title}
            </h1>
            <p className="text-white leading-relaxed text-center pb-3">
              🥅 Target Amount: {moneyformatted}
            </p>
        
                <div className="text-white leading-relaxed text-center">      
                <p>⌛End:<Countdown dateString={dateString} /></p>
                </div>
             
              
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
    
            }
export default Explore;