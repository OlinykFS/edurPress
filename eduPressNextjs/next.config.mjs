/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ['storage.googleapis.com', 'via.placeholder.com'
      ],
    },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
            { key: "Access-Control-Allow-Headers", value: "Authorization, Content-Type" },
          ],
        },
      ];
    },
};

export default nextConfig;
