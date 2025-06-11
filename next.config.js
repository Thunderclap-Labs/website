/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader',
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com', // From previous version of team-members.jsx, good to keep if still used elsewhere or for testing
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;
