const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, 'src/index.tsx'),
    ],
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    watchContentBase: true,
    progress: false,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        cache: path.join(__dirname, '.cache'),
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    namedChunks: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: Infinity,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
        momentVendor: {
          test: /[\/]node_modules[\/](moment)[\/]/,
          name: 'momentvendor',
          chunks: 'all',
        },
        lodashVendor: {
          test: /[\/]node_modules[\/](lodash)[\/]/,
          name: 'lodashVendor',
          chunks: 'all',
        },
        reactVendor: {
          test: /[\/]node_modules[\/](react|react-dom)[\/]/,
          name: 'reactvendor',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'awesome-typescript-loader' },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
};
