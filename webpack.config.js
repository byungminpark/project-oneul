const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./public/reset.css'),
      typeOfAsset: 'css',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      // scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'posstcss',
              // eslint-disable-next-line global-require
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
      },
      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'posstcss',
              // eslint-disable-next-line global-require
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
