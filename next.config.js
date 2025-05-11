// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["localhost","res.cloudinary.com","i.ytimg.com"],
//     disableStaticImages: true,
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//         port: ""
//       },
      
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         port: ""
//       },
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         port: ""
//       },
//       {
//         protocol: "https",
//         hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
//         port: ""
//       }
//     ],
//   }
// };





/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"], // Keep this for backward compatibility
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Be specific here instead of using "**"
        port: "",
        pathname: "/**", // This allows all paths under this hostname
      }
    ],
    unoptimized: false
  }
};

module.exports = nextConfig;


