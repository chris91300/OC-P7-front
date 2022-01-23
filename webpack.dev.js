
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const postcss_loader = require('./postcss.config.js');


const webpack_dev = {
    mode : "development",
    watch : true,
    watchOptions: {
        ignored : /node_modules/
    },
    module : {
        rules : [
            {
                test : /\.(s)?css$/i,
                exclude: /(node_modules|bower_components)/,
                use : [
                    "style-loader",// insert le css du fichier js dans une balise <style> dans le fichier html
                    'css-loader',// insert css dans fichier js
                    postcss_loader,// inject les préfix (webkit ...)
                    'sass-loader'// compile sass en css
                ]
            },
        ]
    }
}


module.exports = merge(common, webpack_dev);