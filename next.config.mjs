// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js configurations can go here
  // For example: output: 'standalone', reactStrictMode: true, etc.

  webpack: (config, { isServer }) => {
    // Only apply this configuration on the server-side build
    if (isServer) {
      // Configure file-loader for pdfkit's data files
      config.module.rules.push({
        test: /\.afm$/, // Match files with .afm extension (font metrics)
        type: 'asset/resource', // Treat them as assets to be copied
        generator: {
          // This ensures the files are placed in a path pdfkit expects
          // relative to where its module eventually loads from.
          // Note: The exact path might need further fine-tuning depending
          // on the ultimate build output structure. This is a common starting point.
          // For server-side bundles, assets might end up in .next/server/chunks/static/media
          // or similar. This 'filename' might require testing.
          filename: 'static/media/[name][ext]',
        },
      });
    }

    return config;
  },
};

export default nextConfig; // Use export default for .mjs files