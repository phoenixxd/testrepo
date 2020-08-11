const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        bundle: './src/index.js'
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    mode: 'development',
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // include: [
                //     path.join(__dirname, 'public/src'),
                //     path.join(__dirname, 'node_modules/@salesforce/design-system-react'),
                // ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(svg|gif|jpe?g|png)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'url-loader?limit=30&name=fonts/webfonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new ExtractTextPlugin('[name].css')
    ]
};