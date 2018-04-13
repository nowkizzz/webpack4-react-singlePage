const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.common')
const merge = require('webpack-merge')
var os = require('os');
var ifaces = os.networkInterfaces();
let hostAddress = ''
// console.log(process.env,44444)
// console.log(ifaces,88888888)
// 获取IPV4 IP地址 作用于devSever
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            hostAddress = iface.address
        }
        ++alias;
    });
});
console.log('本地ip地址：',hostAddress)
module.exports = merge(baseConfig, {
    // devtool: 'inline-source-map',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        // host: '0.0.0.0', // 我们可以允许我们用任意方式进行访问（127.0.0.1，localhost, 本机ip）
        // host:  hostAddress, // IP地址
        port: 8600, 
        open: true,
        progress: true, //打包进度反馈
        contentBase: './dist',  //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public”目录）
        historyApiFallback: true,  // 所有404的请求不跳转 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        publicPath: '/',
        overlay: {  // 错误提醒弹窗小遮层
            errors: true, //只显示error
            // warnings: true,
        },
        proxy: {
            "/webservice/*": {
                target: "http://192.168.13.240",
                // changeOrigin: true
            }
        }
    },
    module: {
        rules: [{
            test: /(\.css|\.less)$/,
            // test: /\.less$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    importLoaders: 1
                }
            }, // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader。
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: (loader) => [
                        // require('postcss-flexbugs-fixes'),
                        // require('postcss-import')({ root: loader.resourcePath }),
                        // require('postcss-cssnext')(),
                        // require('cssnano')(),
                        require('autoprefixer')({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway })
                            ],
                            flexbox: 'no-2009',
                        })
                    ]
                }
            },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true
                }
            }
            ]
        },]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    // performance: {
    //     hints: false,
    // },
})