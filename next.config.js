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
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
