import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  // O site antigo tinha versões em inglês e espanhol
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/es', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
