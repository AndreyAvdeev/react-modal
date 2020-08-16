const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var path = require('path');


module.exports = {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
    },
    plugins: [new HtmlWebPackPlugin({template: "index.html"}),
              new MiniCssExtractPlugin({
                      filename:'style.css',
                      chunkFilename:'style.css'
                    })
            ],
    module:{
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                  loader: "css-loader",
                  options: {
                      sourceMap: true
                  }
              },
              {
                  loader: "sass-loader"
              }
          ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
    }
       
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
  };


  
