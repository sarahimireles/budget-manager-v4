const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // Rule for SCSS files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Match image file extensions
        type: 'asset/resource',        // Use asset modules to emit files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/staticwebapp.config.json', to: 'staticwebapp.config.json' }
      ]
    }),
    new Dotenv({
      path: './.env.local', // Load .env.local for local development
      safe: false, // Don't require .env.example
      systemvars: true, // Load system environment variables (for CI/CD)
      silent: true, // Don't show warnings if .env file is missing (normal in CI/CD)
      defaults: false,
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true, // Redirige todas las rutas al index.html
    compress: true,
    port: 3000
  },
  devtool: 'source-map',
};
