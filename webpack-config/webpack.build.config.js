const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

const buildWebpackConfig = merge(baseConfig, {
    mode: "production",
});

module.exports = new Promise( (resolve, reject) => {
    resolve(buildWebpackConfig);
})