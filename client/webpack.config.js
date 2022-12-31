// General Webpack compiler config

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

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

      // src-sw.js manifest Injector
      new InjectManifest({
        swSrc: './src-sw.js',
        // Put in dist folder
        swDest: 'src-sw.js',
      }),

      // Creates a manifest.json file with the following attributes for styling the app
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'Editor',
        description: 'Write and edit text easily.',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [

      ],
    },
  };
};
