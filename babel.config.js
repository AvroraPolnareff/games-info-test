const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    isDevelopment && "react-hot-loader/babel",
    "@babel/plugin-transform-runtime",
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
      },
    ],
  ].filter(Boolean),
};
