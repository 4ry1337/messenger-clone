/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '**',
        hostname: `res.cloudinary.com`,
      },
      {
        protocol: 'https',
        pathname: '**',
        hostname: `avatars.githubusercontent.com`,
      },
      {
        protocol: 'https',
        pathname: '**',
        hostname: `lh3.googleusercontent.com`,
      },
    ],
  },
};

module.exports = nextConfig;
