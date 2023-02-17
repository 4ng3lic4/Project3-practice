//Delete this line
const { User, Thought } = require('../models');

//add
const { User, Plant } = require('../models');
const userSeeds = require('./userSeeds.json');


//This line will be replaced
const thoughtSeeds = require('./thoughtSeeds.json');

//by this one
const plantsSeeds = require('./plantsSeeds.json');

const seedDatabase = async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
    console.log('all done!');
  } catch (err) {
    console.error(err);
  }

};

module.exports = {
  seedDatabase
}