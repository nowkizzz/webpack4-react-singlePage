const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [{
                test: /.jsx$/,
                loader: 'babel-loader'
            }, {
                test: /.(js)$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules') // 由于node_modules都是编译过的文件， 不让babel处理接下来的文件
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.less$/,
            //     use: [{
            //         loader: "style-loader"
            //     },{
            //         loader: "css-loader"
            //     },{
            //         loader: "less-loader"
            //     }]
            // },
            // {
            //     test: /(\.css|\.less)$/,
            //     // test: /\.less$/,
            //     use: [{
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 sourceMap: true,
            //                 importLoaders: 1
            //             }
            //         }, // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader。
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 sourceMap: true,
            //                 plugins: (loader) => [
            //                     // require('postcss-import')({ root: loader.resourcePath }),
            //                     // require('postcss-cssnext')(),
            //                     // require('cssnano')(),
            //                     require('autoprefixer')({ browsers: 'last 5 version' })
            //                 ]
            //             }
            //         },
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    // 'file-loader'
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),

    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
}