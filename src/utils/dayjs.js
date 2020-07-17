import Vue from 'vue'
// 引入时间模块
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 引入时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 相对时间插件
dayjs.extend(relativeTime)
// 配置为中文
dayjs.locale('zh-cn')

Vue.filter('relativeTime', val => {
  return dayjs().to(dayjs(val))
})
