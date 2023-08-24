const db = require('../config/connection');
const axios = require('axios')
const { User, Campaign, Donation, Review, Purchase_power } = require('../models');
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');
const donationSeeds = require('./donationSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const calculationSeeds = require('./calculationSeeds.json')
require('dotenv').config();

const { createClient }= require('pexels');
const { listenerCount } = require('../models/user');

const client = createClient("Ye2UshXYnHmNK57q4gdWYAVanWcVnieomiPaZ2vgEY9t31mbHCLYvChY");

const apiKey = "Ye2UshXYnHmNK57q4gdWYAVanWcVnieomiPaZ2vgEY9t31mbHCLYvChY";
const searchQuery = 'poverty'; 
const offset =0;
const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=20&page=${offset}`;



db.once('open', async () => {


 async function fetchData() {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey
        }
      });

      if (response.status !== 200) {
        throw new Error('Request failed with status ' + response.status);
      }

      const data = response.data;
      displayImage(data);
      
      

    } catch (error) {
      console.error('Error:', error);
    }
  }

  let pictureSeed = [];
  function displayImage(data) {

    const campaignPictures = data.photos.map(photo => photo.src.medium);
   

    pictureSeed.push(campaignPictures);
    console.log(campaignPictures)
  }
  fetchData();
  

  // handle img

  async function convertImageToBase64(url) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const base64Data = Buffer.from(response.data, 'binary').toString('base64');
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }


  try {
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await Donation.deleteMany({});
    await Review.deleteMany({});
    await Purchase_power.deleteMany({});
    const createdUsers = await User.create(userSeeds);
    console.log('Users seeded successfully');



    // CREATE CAMPAIGN 
    const campaignsWithCreatorId = campaignSeeds.map((campaign, index) => {
      const creatorIndex = index % createdUsers.length; // Get the index of the user in a circular manner
      campaign.creatorId = createdUsers[creatorIndex]._id;
      return campaign;
    });

    const campaignImage1 = await Promise.all(campaignsWithCreatorId.map(async (campaign, index) => {
      const imageData = await convertImageToBase64(pictureSeed[0][index]);
      campaign.image = {
        data: imageData,
        contentType: 'image/jpeg', 
      };
      return campaign;
    }));

    console.log(campaignImage1)
    const createdCampaigns = await Campaign.create(campaignImage1);
    console.log('Campaigns seeded successfully');

    for (const campaign of createdCampaigns) {
      const campaignId = campaign._id;
      const creatorId = campaign.creatorId;
    
      await User.updateOne(
        { _id: creatorId },
        { $push: { createdCampaigns: campaignId } }
      );
    }
    // CREATE DONATION
    const donationsWithId = donationSeeds.map((donation, index) => {
      const donorIndex = index % createdUsers.length; // Get the index of the user in a circular manner
      donation.donorId = [createdUsers[donorIndex]._id];
      donation.campaignId = createdCampaigns[0]._id;
      return donation;
    });

    const createdDonations = await Donation.create(donationsWithId);
    console.log('Donations seeded successfully');
   
    for (const donation of createdDonations) {
      const donationId = donation._id;
      const donorId = donation.donorId[0];
    
      await User.updateOne(
        { _id: donorId },
        { $push: { donatedCampaigns: donationId } }
      );
      };
    // CREATE REVIEW
    const reviewWithId = reviewSeeds.map((review, index) => {
      const creatorIndex = index % createdUsers.length; // Get the index of the user in a circular manner
      review.creatorId = createdUsers[creatorIndex]._id;
      review.campaignId = createdCampaigns[0]._id;
      return review;
    });

    const createdReviews = await Review.create(reviewWithId);
    console.log('Donations seeded successfully');

    
 const calculationWithId = calculationSeeds.map((calculation, index) => {
  const userIndex = index % createdUsers.length; // Get the index of the user in a circular manner
  calculation.userId = createdUsers[userIndex]._id;
  return calculation;
});

    const createdCalculation = await Purchase_power.create(calculationWithId);
    console.log('Purchase_Power seeded successfully');
    process.exit(0);


    // for (let i = 0; i < campaignSeeds.length; i++) {
    //   const campaign = await Campaign.findById(campaignSeeds[i]._id);
    //   try {
    //     const response = await axios.get('https://thispersondoesnotexist.com/', {
    //       responseType: 'arraybuffer',
    //     });
    //     const imageBuffer = Buffer.from(response.data, 'binary');
    //     campaign.image = imageBuffer.toString('base64');
    //     await campaign.save();
    //     console.log(`Image added to campaign`);
    //   } catch (error) {
    //     console.error(`Error fetching image for campaign: ${error.message}`);
    //   }
    // }
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1)
  }
});