import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import '../styles/style.css'


function Explore() {
    const { loading, data } = useQuery(QUERY_CAMPAIGN
      );
      const campaignList = data?.campaigns || [];
   
      return (
        <div className="flex flex-col">
          <div className="flex flex-wrap -m-4">
            {campaignList.map((campaign) => {
              //  const endDate = new Date(campaign.endDate);
              //  const formattedEndDate = endDate.toLocaleTimeString('en-US'); 
             
              return (
                <div className="sm:w-1/4 w-full p-4 relative" key={campaign.title}>
                  <div className="relative bg-slate-400">
                    <img
                      alt="gallery"
                      className="w-80 h-60 object-cover object-center"
                      src={campaign.image}
                    />
                    <div className="absolute bottom-0 left-0 right-0 px-8 py-10 bg-gray-600 bg-opacity-80 text-white">
                      <h1 className="text-white title-font text-lg font-medium mb-3">
                        {campaign.title}
                      </h1>
                      <p className="text-white leading-relaxed">
                        Target Amount: ${campaign.targetAmount} | End Date: {campaign.endDate}
                      </p>
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