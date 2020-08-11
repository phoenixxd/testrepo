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
        path: path.join(__dirname, 'build'),
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
                            ['@babel/preset-env', {
                                debug: true,
                                // Configure how @babel/preset-env handles polyfills from core-js.
                                // https://babeljs.io/docs/en/babel-preset-env
                                useBuiltIns: 'usage',

                                // Specify the core-js version. Must match the version in package.json
                                corejs: 3,
                            }],
                            "@babel/react"
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