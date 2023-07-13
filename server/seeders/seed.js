const db = require('../config/connection');
const axios = require('axios')
const { User, Campaign, Donation } = require('../models');
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');
const donationSeeds = require('./donationSeeds.json');





db.once('open', async () => {
  try {
    await User.deleteMany({});
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
      donation.campaignId = createdUsers[0]._id;
      return donation;
    });

    const createdDonations = await Donation.create(donationsWithId);
    console.log('Donations seeded successfully');
   

    

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