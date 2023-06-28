/** @type {import('next').NextConfig} */
require('dotenv').config({
  path: process.env.NODE_ENV === "production" ? '../.env' : './.env',
});
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "fakeimg.pl"],
  },
  env: {
    WEB_URL: process.env.WEB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
  },
};

module.exports = nextConfig;
