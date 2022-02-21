const path = require('path')

const dist_path = path.resolve(__dirname, 'dist');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = {
    devtool : false,

    entry : {
        index : {import : "./src/index.js"},
    },
    output : {
        path : dist_path,
        publicPath : '/',
        filename : 'js/[name]-[contenthash].js'
    },
    
    module : {
        rules : [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use : ['babel-loader']
                
            },
           {
                test: /\.ejs$/,
                loader : 'ejs-compiled-loader',
                options : {
                    compileDebug : true
                }
                
            },
            {
                test : /\.(png|svg|jpg|jpeg|gif|webp.ico)$/,
                use : [
                    {
                        loader : "file-loader",
                        options : {
                            name : '[name].[ext]',
                            outputPath: 'img/',
                           
                        }
                    }
                ],
                
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use : [
                    {
                        loader : "file-loader",
                        options : {
                            name : '/font/[name].[ext]',
                        } }],
            },
            
        ]// end rules
    },// end module

    plugins : [
        // nettoie le dossier dist à chaque redémarrage de webpack
        new CleanWebpackPlugin(),
        
        new htmlWebpackPlugin({
            inject : true,
            title : "Groupomania",
            template : './views/index.ejs',
            filename: 'index.html',
            publicPath : '/',
            chunks : ["index"],
            
        })
        
    ]

}





module.exports = common;