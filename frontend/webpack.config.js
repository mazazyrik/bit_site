const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    main: './src/scripts/index.js',
    reg: './src/scripts/reg.js'  // Если есть отдельный JS для reg.html
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.[contenthash].js',
    clean: true,
    publicPath: ''
  },
  module: {
    rules: [
      // Обработка CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
        include: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'src/styles/animations.css'),
          path.resolve(__dirname, 'src/styles/fonts.css'),
          path.resolve(__dirname, 'src/styles/index.css')
        ]
      },
      // Обработка шрифтов
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
        include: path.resolve(__dirname, 'src/fonts')
      },
      // Обработка изображений
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        },
        include: path.resolve(__dirname, 'src/images')
      },
      // Обработка HTML
      {
        test: /\.html$/,
        use: ['html-loader'],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    // Главная страница
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    // Страница регистрации
    new HtmlWebpackPlugin({
      template: './src/pages/reg.html',
      filename: 'reg.html',
      chunks: ['reg']
    }),
    // Извлечение CSS
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css'
    }),
    // Копирование статических файлов
    new CopyPlugin({
      patterns: [
        { 
          from: 'src/images', 
          to: 'images',
          noErrorOnMissing: true
        },
        { 
          from: 'src/fonts', 
          to: 'fonts',
          noErrorOnMissing: true
        },
        {
          from: 'src/readme',
          to: '',
          noErrorOnMissing: true
        },
        {
          from: 'src/LICENSE',
          to: '',
          noErrorOnMissing: true
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  }
}
