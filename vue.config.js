const baseUrl = require('./src/service/env')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: IS_PROD ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    proxy: {
      '/api': {
        target: baseUrl.server,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/githubApi': {
        target: 'https://api.github.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/githubApi': '',
        },
      },
      '/cdnJS': {
        target: 'https://api.cdnjs.com/libraries',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/cdnJS': '',
        },
      },
      '/qiNiu': {
        target: 'http://upload-z2.qiniup.com',
        pathRewrite: {
          '^/qiNiu': '',
        },
      }
    },
  },
  configureWebpack: config => {
    config.module.rules.push({
      /*test: /\.extension$/,*/
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@styles', resolve('src/styles'))
      .set('@assets', resolve('src/assets'))
      .set('@service', resolve('src/service'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
  },

  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `@import '@styles/main.scss';`,
      },
    },
  },

  transpileDependencies: [
    'vuetify'
  ]
}
