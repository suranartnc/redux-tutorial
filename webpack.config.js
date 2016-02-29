var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'cheap-module-eval-source-map',
    
    entry: [
        // 'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        path.join(__dirname, 'src/client.js')
    ],

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    }
};