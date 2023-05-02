const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stats: 'normal',
  mode: 'development',
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    // filename: '[name][contenthash].js',
    filename: 'bundle.js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },

  // Dev settings
  devtool: 'source-map',
  devServer: {
    static: {
      // directory: resolve(__dirname, 'dist')
    },
    port: 3000,
    // open: true, // open browser window
    hot: true, // hot module reloading
    compress: true, // gzip
    historyApiFallback: true,
  },

  // PLUGINS
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ],

  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    //extensions: ['.js', '.jsx'],
  },

  // WEBPACK MODULES
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
            assert: { type: 'css' },
            loader: 'css-loader',
            options: {
              exportType: 'css-style-sheet',
              // Other options
            },
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  // Other options
                },
              },
            ],
          },
        ],
      },
      { // images
        test: /\.(jpg|jpeg|png|svg|gif|ico)$/i,
        type: 'asset/resource'
      }
    ],
  },
};
