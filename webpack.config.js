const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  devServer: {
    static: { 
      // directory: resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true, // open browser window
    hot: true, // hot module reloading
    compress: true, // gzip
    historyApiFallback: true,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    })
  ],

  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    //extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      { // BABEL
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      { // CSS
        test: /.css$/,
        oneOf: [
          {
            assert: { type: "css" },
            loader: "css-loader",
            options: {
              exportType: "css-style-sheet",
              // Other options
            },
          },
          {
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  // Other options
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

//import { resolve } from 'path';
//export default {
//
//  mode: 'development',
//  entry: './src/index.js',
//
//  output: {
//    filename: 'main.js',
//    // path: resolve(__dirname, 'dist')
//  },
//
//  devServer: {
//    static: { 
//      // directory: resolve(__dirname, 'dist')
//    },
//    port: 3000,
//    open: true, // open browser window
//    hot: true, // hot module reloading
//    compress: true, // gzip
//    historyApiFallback: true,
//  },
//
//  // jsx
//  module: {
//    rules: [
//      {
//        test: /\.m?js$/,
//        exclude: /node_modules/,
//        use: {
//          loader: 'babel-loader',
//          options: {
//            presets: [
//              ['@babel/preset-react', { targets: "defaults" }]
//            ]
//          },
//        }
//      }
//    ]
//  },
//
//  // css
//  module: {
//    rules: [
//      {
//        test: /\.css$/i,
//        oneOf: [
//          {
//            assert: { type: "css" },
//            loader: "css-loader",
//            options: {
//              exportType: "css-style-sheet",
//              // Other options
//            },
//          },
//          {
//            use: [
//              "style-loader",
//              {
//                loader: "css-loader",
//                options: {
//                  // Other options
//                },
//              },
//            ],
//          },
//        ],
//      },
//    ],
//  }
//};
