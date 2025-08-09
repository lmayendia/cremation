/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
            pathname: '/uploads/**',
          },
          {
            protocol: 'https',
            hostname: 'cms-cremation.s3.us-east-2.amazonaws.com',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
