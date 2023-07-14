const db = require('../config/connection');
const axios = require('axios')
const { User, Campaign, Donation, Review, Purchase_power } = require('../models');
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');
const donationSeeds = require('./donationSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const calculationSeeds = require('./calculationSeeds.json')

//p
const apiKey = 'Ye2UshXYnHmNK57q4gdWYAVanWcVnieomiPaZ2vgEY9t31mbHCLYvChY';
const searchQuery = 'person'; 
const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}`;
fetch(apiUrl, {
  headers: {
    Authorization: apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
  
    console.error('Error:', error);
  });


db.once('open', async () => {
  
  try {
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await Donation.deleteMany({});
    await Review.deleteMany({});
    await Purchase_power.deleteMany({});
    const createdUsers = await User.create(userSeeds);
    console.log('Users seeded successfully');


    const campaignsWithCreatorId = campaignSeeds.map(campaign => {
      campaign.creatorId = createdUsers[0]._id;
      return campaign;
    });

    const createdCampaigns = await Campaign.create(campaignsWithCreatorId);
    console.log('Campaigns seeded successfully');

    const donationsWithId = donationSeeds.map(donation => {
      donation.donorId = [createdUsers[0]._id];
      donation.campaignId = createdCampaigns[0]._id;
      return donation;
    });

    const createdDonations = await Donation.create(donationsWithId);
    console.log('Donations seeded successfully');
   

    const reviewWithId = reviewSeeds.map(review => {
      review.creatorId = createdUsers[0]._id;
      review.campaignId = createdCampaigns[0]._id;
      return review;
    });

    const createdReviews = await Review.create(reviewWithId);
    console.log('Donations seeded successfully');

    
    const calculationWithId = calculationSeeds.map(calculation => {
      calculation.userId = createdUsers[0]._id;
    
      return calculation;
    });

    const createdCalculation = await Purchase_power.create(calculationWithId);
    console.log('Purchase_Power seeded successfully');


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
  }
});