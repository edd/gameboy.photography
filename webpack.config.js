/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

'use strict';

module.exports = {
  output: {
    filename: 'main.js'
  },

  cache: true,
  debug: true,
  devtool: 'inline-sourcemap',
  entry: './src/scripts/states/home.jsx',

  stats: {
    colors: true,
    reasons: true
  },

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
    { test: /\.woff$/,   loader: "url-loader?limit=1000000&mimetype=application/font-woff" },
    { test: /\.ttf$/,    loader: "url-loader?limit=1000000&mimetype=application/font-ttf" },
    { test: /\.eot$/,    loader: "url-loader?limit=1000000&mimetype=application/font-eot" },
    { test: /\.svg$/,    loader: "url-loader?limit=1000000&mimetype=application/xml" }
    ]
  }
};