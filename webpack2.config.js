var webpack = require('webpack');
let path = require('path')


module.exports = {
    entry: {
        firstComp: './src/js/firstComp/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js/components'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015']
                    ]
                }
            }
        ]
    },
    mode: 'development'
} 
    

