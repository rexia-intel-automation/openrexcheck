/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  env: {
    OPENCLAW_GATEWAY_URL: process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:3000'
  }
}

module.exports = nextConfig