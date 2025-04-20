/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  // output: 'export', needs to deploy on Netlify
  trailingSlash: true,
  optimizeDeps: {
    include: ['monaco-editor'],
  },
};

export default nextConfig;
