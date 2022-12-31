// General Webpack compiler config

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

// All static assets (HTML, CSS, JS) will have the bundle.js at the end of the file once bundled for offline
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      // Path will be the current directory, then the dist sub folder
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),

      // src-sw.js Injector
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [

      ],
    },
  };
};
