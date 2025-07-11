/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.module.rules.push({
        test: /\.afm$/, 
        type: 'asset/resource', 
        generator: {
          filename: 'static/media/[name][ext]',
        },
      });
    }

    return config;
  },
};

export default nextConfig;
