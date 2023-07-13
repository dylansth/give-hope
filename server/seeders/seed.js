const db = require('../config/connection');
const { User, Campaign, Donation } = require('../models');
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');
const donatioSeeds = require('./donatioSeeds.json');

db.once('open', async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
