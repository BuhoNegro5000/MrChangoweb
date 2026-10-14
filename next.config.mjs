/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Guarantees instant local image rendering without Node canvas issues
  },
};

export default nextConfig;
