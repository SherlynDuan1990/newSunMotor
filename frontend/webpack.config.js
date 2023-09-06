const path = require('path');

module.exports = {
  // ... (other Webpack configuration options)

  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/"),
      "buffer": require.resolve('buffer/'),

    },
  },

  // ... (rest of your Webpack configuration)
};
