module.exports = {

  presets: [
    ['@babel/preset-env', {
      targets: {
        esmodules: true,
      },
      corejs: '3.0.0',
      useBuiltIns: 'usage',
    }],
    '@babel/preset-react'
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-transform-runtime',
    ["babel-plugin-styled-components", {
      ssr: false,
      "displayName": true
    }]
  ]
}
