const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        overlay:{
            warnings: true,
            errors: true
        },
        port: 8081,
    },
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})