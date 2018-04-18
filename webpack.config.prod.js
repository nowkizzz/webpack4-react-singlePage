const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway })
                                    ]
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
    optimization:{
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }   
    },
    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        // 将所有从node_modules中的模块打包到vendor 4.0webpack删除
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     // minChunks: Infinity
        //     minChunks(module) {
        //         return (
        //             module.resource && /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(path.join(__dirname, '../node_modules') === 0)
        //         )
        //     }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "manifest",
        //     // filename: 'manifest.js',
        //     minChunks: Infinity
        // }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: 'static',
                ignore: ['.*']
            }
        ])
    ]
})