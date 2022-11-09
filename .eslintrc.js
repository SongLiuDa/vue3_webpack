/*
" off " 或者 0，关闭
" warn " 或者 1，警告
" error " 或者 2，报错
*/
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    'plugin:vue/vue3-recommended', 'standard'
  ],
  plugins: ['vue'],
  rules: {
    'space-before-function-paren': 'off', // 方法名和括号之间需要有空格
    'vue/multi-word-component-names': 'off', // 检测当前的组件名称是否使用驼峰或多单词命名
    'no-unused-vars': 'off' // 不能有声明后未被使用的变量或参数
  }
}
