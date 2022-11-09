const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
module.exports = defineConfig({
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 语法编译
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8888,
    https: false,
    open: true, // 配置自动启动浏览器
    hot: true, // 局部刷新，不刷新整个页面
    liveReload: true // 热加载
  },
  css: {
    loaderOptions: {
      css: {
        // 启用 CSS modules
        modules: {
          auto: () => false
        }
      }
    },
    // 开启 CSS source maps，
    sourceMap: false
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve(__dirname, 'src/styles/variables.scss'),
        resolve(__dirname, 'src/styles/mixin.scss')
      ]
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .end()
      // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          preserveWhitespace: true
        }
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            // runtime.js非常的小，gzip 之后一般只有几 kb，但这个文件又经常会改变，我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以内联到我们的 index.html
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` 和 runtimeChunk 同名. 默认`runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementPlus', // 将elementUI拆分成一个包
                  priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\/]node_modules[\\/]element-plus[\\/]/
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
})
