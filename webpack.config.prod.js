var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'source-map',
    
    entry: path.join(__dirname, 'src/client.js'),

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ]
};