/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
    ],
  },
  // webpack(config) {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /^next\/(navigation|headers|compat\/router)$/,
  //     })
  //   );
  //   return config;
  // },
};

module.exports = nextConfig;
