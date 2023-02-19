// //add
// const { User, Plant } = require("../models");
// const userSeeds = require("./userSeeds.json");
// const plantSeeds = require("./plantsSeeds.json");

// const seedDatabase = async () => {
//   try {
//     await Plant.deleteMany({});
//     await User.deleteMany({});

//     await User.create(userSeeds);

//     for (let i = 0; i < plantSeeds.length; i++) {
//       const { _id, plantAuthor } = await Plant.create(plantSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: plantAuthor },
//         {
//           $addToSet: {
//             plant: _id,
//           },
//         }
//       );
//     }
//     console.log("all done!");
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = {
//   seedDatabase,
// };
