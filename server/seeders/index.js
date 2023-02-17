require('dotenv').config();
// console.log(process.env.NODE_ENV);
const db = require('../config/connection');

const { seedDatabase } = require("./seed");

const run = async () => {
  await seedDatabase();

  process.exit();
}

db.once('open', () => {
  run();
});