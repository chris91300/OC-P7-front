const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserJsPlugin = require("terser-webpack-plugin");
const postcss_loader = require('./postcss.config.js');

const webpack_prod = {
    mode : "production",
    module : {
        rules : [
            {
                test : /\.(scss|css)$/i,
                exclude: /(node_modules|bower_components)/,
                use : [
                    miniCssExtractPlugin.loader,// insert le css du fichier js dans un fichier css
                    'css-loader',// insert css dans fichier js
                    postcss_loader,// inject les préfix (webkit ...)
                    'sass-loader'// compile sass en css
                ]
            },
        ]
    },
    plugins : [
        new miniCssExtractPlugin({
            filename : 'css/[name]-[contenthash].css'
        }),
        //  definedPlugin pour que styled-component (projet : market) fonctionne en prod sinon il n'est pas injecté dans le DOM
        new webpack.DefinePlugin({ 
            SC_DISABLE_SPEEDY: true , 
          })
    ],
    optimization : { 
        minimizer : [ 
          new  CssMinimizerPlugin ( ) , // minification des fichiers css
          new terserJsPlugin({// minification des fichiers js
              parallel : true // accélération des processus de webpack
            }) 
        ],
        splitChunks : {
            chunks : 'all'// permet d'injecter dans le fichier html uniquement le contenue nécessaire et non redondant
        }
      } 
}


module.exports = merge(common, webpack_prod);