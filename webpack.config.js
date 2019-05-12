module.exports = {
    entry  : ['babel-polyfill', './src/main.js'],
    mode: 'development',
    output : {
        path     : __dirname,
        filename : 'sudoku.dist.js'
    },
    module : {
        rules: [ {
                test   : /.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
                query: {
                    // presets: [
                    //     'es2015',
                    //     'stage-0'
                    // ]
                }
            }
        ]
    }
};
