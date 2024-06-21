/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
