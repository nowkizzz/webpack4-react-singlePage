const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = merge(baseConfig, {
    // devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /(\.css|\.less)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                // require('postcss-import')({ root: loader.resourcePath }),
                                // require('postcss-cssnext')(),
                                // require('cssnano')(),
                                require('autoprefixer')({
                                    browsers: 'last 5 version'
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            })
        }]
    },
    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('[name]-[hash].css')
    ]
})