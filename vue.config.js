const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  parallel: false,
  filenameHashing: true,
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false,
    },
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions,
          plugins: ['@vue/compiler-sfc'],
        };
        return options;
      });
  },
});
