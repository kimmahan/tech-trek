/** @type {import('next').NextConfig} */
require('dotenv').config(); // Load .env.local variables

const nextConfig = {
  reactStrictMode: true,
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  },
};

module.exports = nextConfig;

