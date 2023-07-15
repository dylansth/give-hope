import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';
import '../styles/style.css'


function Explore() {
    const { loading, data } = useQuery(QUERY_CAMPAIGN
      );
    
      const campaignList = data?.campaigns || [];

    return(
        <div className="flex flex-col">
        <div className="flex  flex-wrap -m-4">
          {campaignList.map((campaign) => (
            <div className="sm:w-1/4 w-full p-4 relative" key={campaign.title}>
              <div className="relative bg-slate-400">
                <img
                  alt="gallery"
                  className="w-100 h-100 object-cover object-center"
                  src={campaign.image}
                />
                 </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-5 hover:opacity-100 z-10">
                  <div className="px-8 py-10 bg-gray-600 bg-opacity-80 text-white ">
                    <h1 className="text-white title-font text-lg font-medium mb-3">
                      {campaign.title}
                    </h1>
                    <p className="text-white object-cover leading-relaxed">{campaign.description}</p>

                    <div className='flex flex-row justify-center flex-wrap' >
                    </div>
                  </div>
                </div>
              </div>
           
          ))}
        </div>
      </div>
    )
}

export default Explore;