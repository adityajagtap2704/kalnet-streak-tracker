/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Do not fail the build on ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Do not fail the build on TypeScript errors
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
