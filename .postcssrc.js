module.exports = {
  plugins: {
    // vue cli 内部已配置
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 根元素值，rootvalue设计稿尺寸/10
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置需要转换的css属性，*所有
      propList: ['*']
    }
  }
}
