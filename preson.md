### 首页

- <van-nav-bar/> 导航

  - <van-button slot='title' round/>按钮
    - <i slot='icon' class='iconfont search'></i>

- 频道列表
  - swipeable 手指滑动
  - sticky 粘性滑动
  - - flex-shrink:0 右侧汉堡菜单设置。不占计算尺寸，直接赋值

```html
<van-tabs v-model="active" sticky>
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
  <template slot="nav-right">
    <div 设置占位></div>
    <div>
      <i class="iconfont sss"></i>
    </div>
  </template>
</van-tabs>
```

> 获取频道列表

- 1.对象方式存储数据
- 2.组件化独立写
  - <article-list :channel=channel / >
  - 父传子 类型 props:{
    channel:{
    type:Obiject,
    required:true
    }
    }

```html
<!-- 上拉加载 -->
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
```

- list 储存列表数据
- loading 加载中状态
- finished 加载完成状态
- load 事件 初始化或滚动到底部，如果一次刷新没有铺满列表视口，再次加载一次。加载结束后 loading 设置 false.zu 最后判断数据加载完把 finished 设置 true
- 当前最新时间 Date.now()

> 数据结构 \*\* \*\*

- const {results}=data.data
- this.list.push(...results)

错误提示

:error.sync="error"
error-text="请求失败，点击重新加载"

data 中 error:false

函数中：
this.loading:false 为下一次加载数据，必须设置 loading:false
this.error:true

<!-- 下拉加载 -->

- isLoading 下拉状态

```html
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</van-pull-refresh>
```

传递最新 Date.now()
success-duration:1500 时长显示

<!-- 视口滚动 VH视口高-->

vh 响应式单位

- 父元素设置
  固定的高度或固定宽度
  - height: 79vh;
  - overflow: auto;

### vh/vw 视口高宽

## article-item 子组件-文章列表项

- 父组件 <article-item  :article:article />
- 子组件

```js
data(){
  return {
     props:{
  article:{
  type:Object,
  required:true
  }
  }
  }
}
```

```html
<van-cell class="article-item">
  <div slot="title">标题</div>
  <template slot="label">
    <template
      v-if="article.cover.type===3"
      v-for="item in article.cover.images"
      :key="item.id"
    >
      <van-image fit="contain" src="item" />
    </template>
    <span>{{article.name}}</span>
    <span>{{article.pinglun}}</span>
    <span>{{shijian}}</span>
  </template>
  <template slot="default" v-if="article.cover.type===1">
    <van-image fit="contain" src="article.cover.images[0]" />
  </template>
</van-cell>
```

memontjs-语言选择 moment.locale(); // zh-cn
相对时间
moment("20111031", "YYYYMMDD").fromNow(); // 9 年前
moment("20120620", "YYYYMMDD").fromNow(); // 8 年前
moment().startOf('day').fromNow(); // 11 小时前
moment().endOf('day').fromNow(); // 13 小时内
moment().startOf('hour').fromNow(); // 43 分钟前

```js
dayjs().to(dayjs(value))

<!-- 引入dayjs -->

import Vue from 'vue'
import dayjs from 'dayjs'

<!-- 加载中文语言包 -->

import 'dayjs/locale/zh-cn'

<!-- 配置全局使用 -->

dayjs.lacale('zh-cn')

<!-- 引入插件 -->

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extent(relativeTime)

<!-- 使用模块 filter过滤器数据加工处理-->
Vue.filter('relativeTime',value=>{
  return dayjs().to(dayjs(value))
})


<!-- 引入主体使用 -->

import '@/utils/dayjs.js'
```

### 弹出层 popup

- isCahnnelEditShow:'false' 隐藏

```js
<van-popup
  v-model="isCahnnelEditShow"
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '100%' }"
/>
```

<!-- 宫格 -->

```html
<van-grid :gutter="10">
  <van-grid-item v-for="value in 8" :key="value" icon="plus" text="文字" />
</van-grid>
```
