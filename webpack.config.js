var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        admin: './admin/index.js',
        consumer: './consumer/index.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};