/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'ui-avatars.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
