
module.exports = {
    outputDir: '../cmdb/frontend/dist',

    devServer: {
        disableHostCheck: true,
        port: 8080,
        https: false,

        //proxy:'http://localhost:2222'
        proxy: {
            '/api': {
                ws: false,
                changeOrigin: true,
                target: 'http://127.0.0.1:8050'
            },

            '/ws/term': {
                target: 'ws://127.0.0.1:8022',
                ws: true,
                changeOrigin: true
            },
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
};
