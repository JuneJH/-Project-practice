module.exports = {
    productionSourceMap:false,
    publicPath:'./',

    devServer: {
        port: 8080,
        proxy: {
          '/test/': {
            target: 
            // "http://127.0.0.1:8090/",
            // "http://192.168.207.104:28080/",
            "http://127.0.0.1:12306/",
            // "http://192.168.207.100:28080/",
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '/test/': ""
            }
          },
        },
      }
    

}


