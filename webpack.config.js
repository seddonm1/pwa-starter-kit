/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  plugins: [
    new CopyWebpackPlugin([
      'images/**',
      'node_modules/@webcomponents/webcomponentsjs/**',
      'manifest.json'
    ]),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: 'index.html'
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      include: ['index.html', 'manifest.json', /\.js$/],
      exclude: [/\/@webcomponents\/webcomponentsjs\//],
      navigateFallback: 'index.html',
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\/@webcomponents\/webcomponentsjs\//,
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: /^https:\/\/fonts.gstatic.com\//,
          handler: 'staleWhileRevalidate'
        }
      ]
    })
  ]
};