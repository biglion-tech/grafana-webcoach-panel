const
  path = require('path'),
  webpack = require('webpack');

const webpackconfig = {
  entry: {
    module: './src/main.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: "[name].js?[chunkhash]",
    path: path.resolve(__dirname, './'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      },
      { 
        test: /\.ts?$/, 
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
  },
  stats: {
    colors: true,
    hash: false,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  resolve: {
    alias: {
      'app': path.resolve(__dirname, './../../../public/app'),
      'vendor': path.resolve(__dirname, './../../../vendor')
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  mode: "development",
  plugins: []
}

module.exports = webpackconfig
