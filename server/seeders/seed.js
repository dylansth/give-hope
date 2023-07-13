const db = require('../config/connection');
const { User, Campaign, Donation } = require('../models');
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');
const donationSeeds = require('./donationSeeds.json');

db.once('open', async () => {
  try {
    await Donation.deleteMany({});
    await Campaign.deleteMany({});
    await User.deleteMany({});

    ///USER CREATE

    await User.create(userSeeds);

     ///cAMPAIGN  CREATE


    for (let i = 0; i < campaignSeeds.length; i++) {
      const { _id: campaignId, creatorId } = await Campaign.create(campaignSeeds[i]);
      const user = await User.findByIdAndUpdate(
        creatorId,
        {
          $push: {
            createdCampaigns: campaignId,
          },
        }
      );
    }

    ///DONATION  CREATE
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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('All seeding done!');
  process.exit(0);
});
