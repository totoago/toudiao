<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" round size="small" icon="search">搜索</van-button>
    </van-nav-bar>

    <van-tabs class="channel-tabs" :v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list :channel="item" />
      </van-tab>
      <!-- 右边横符 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserchannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: '',
  components: { ArticleList },
  props: {},
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  coputed: {},
  watch: {},
  created() {
    this.loadchannels()
  },
  mounted() {},
  methods: {
    async loadchannels() {
      try {
        const { data } = await getUserchannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  padding-top: 100px;
  margin-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;

    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .van-icon-search {
    color: #fff;
    font-size: 32px;
  }
  /deep/.channel-tabs {
    .van-tabs__warp {
      position: fixed;
      z-index: 1;
      top: 46px;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777;
      border-right: 2px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    .iconfont {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
