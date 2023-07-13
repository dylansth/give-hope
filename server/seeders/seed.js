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
    console.log('Users seeded successfully:', createdUsers);

    const campaignsWithCreatorId = campaignSeeds.map(campaign => {
      campaign.creatorId = createdUsers[0]._id;
      return campaign;
    });

    const createdCampaigns = await Campaign.create(campaignsWithCreatorId);
    console.log('Campaigns seeded successfully:', createdCampaigns);

    for (let i = 0; i < donationSeeds.length; i++) {
      const { campaignId, donorId } = donationSeeds[i];
      const donation = await Donation.create({
        campaignId,
        donorId,
        amount: donationSeeds[i].amount,
      });

      const user = await User.findByIdAndUpdate(
        donorId,
        {
          $push: {
            donatedCampaigns: donation._id,
          },
        }
      );

      const campaign = await Campaign.findByIdAndUpdate(
        campaignId,
        {
          $push: {
            donations: donation._id,
          },
          $inc: {
            currentAmount: donationSeeds[i].amount,
          },
        }
      );
    }

    for (let i = 0; i < campaignSeeds.length; i++) {
      const campaign = await Campaign.findById(campaignSeeds[i]._id);
      try {
        const response = await axios.get('https://thispersondoesnotexist.com/', {
          responseType: 'arraybuffer',
        });
        const imageBuffer = Buffer.from(response.data, 'binary');
        campaign.image = imageBuffer.toString('base64');
        await campaign.save();
        console.log(`Image added to campaign`);
      } catch (error) {
        console.error(`Error fetching image for campaign: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
});