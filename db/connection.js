// db/index.js

// .env file ko load karne ke liye
require('dotenv').config();

const { drizzle } = require("drizzle-orm/node-postgres");




const db = drizzle(process.env.DATABASE_URL);

// 'db' object ko export karein taaki doosri files use kar sakein
module.exports = db;