/**
 * configuration de postcss pour webpack
 */


 module.exports = {
    loader : "postcss-loader",
    options : {
        postcssOptions: {
            plugins: [
              [
                "postcss-preset-env",
                {
                  // Options
                },
              ],
            ],
        },
    }
} 