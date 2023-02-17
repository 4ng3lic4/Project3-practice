const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');

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