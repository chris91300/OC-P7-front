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
        publicPath : '/',//dist_path,
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
                           /* postTransformPublicPath : ( p ) => { 
                                let url = p.split('+')[1];                            
                                url = url.replace(" ", "");
                                
                                return url;
                            }*/
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
            //favicon : './src/img/icon.ico'
        })/*,
        new htmlWebpackPlugin({
            inject : true,
            title : "Groupomania-error404",
            template : './views/error404.ejs',
            filename: 'error404.html',
            publicPath : '/',
            chunks : ["main"],
        })*/
        
    ]

}

/*
//insert dans webpack.plugin un nouveau htmlWebpackPlugin pour chaque projet
const projects = ['imc', 'newsblog', 'market', 'calculator', 'pendu']

projects.map((file)=>{
    common.plugins.push(new htmlWebpackPlugin({
        inject : true,
        title : "MC-"+file,
        filename : file+".html",
        template : `./views/${file}.ejs`,
        publicPath : '/',
        chunks : [file]
    }))
})*/




module.exports = common;