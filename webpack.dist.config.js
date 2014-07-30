/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {
  output: {
    publicPatch: 'dist/',
    path: 'dist/scripts/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/scripts/routes/routes.jsx',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],

    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.gif/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    }, {
      test: /\.jsx$/,
      loader: 'jsx-loader'
    },
    { test: /\.woff$/,   loader: "url-loader?limit=10&minetype=application/font-woff" },
    { test: /\.ttf$/,    loader: "url-loader?limit=10&minetype=application/font-ttf" },
    { test: /\.eot$/,    loader: "url-loader?limit=10&minetype=application/font-eot" },
    { test: /\.svg$/,    loader: "url-loader?limit=10&minetype=application/xml" }
    ]
  }
};