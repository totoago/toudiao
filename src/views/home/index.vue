<template>
  <div class="home-container">
    <!-- 主页导航 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #left>
        <van-image :src="require('@/assets/logo.png')" class="left-image" />
      </template>
      <van-button
        class="search-btn"
        slot="right"
        type="info"
        round
        size="small"
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 列表属性 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id" :name="item.id">
        <article-list :channel="item" />
      </van-tab>
      <!-- 右边汉堡符 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isShoweidt = true">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShoweidt"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-eidt
        :my-channel="channels"
        :active="active"
        @changechannel="editchannel"
        @changeActive="activechange"
        @changepd="pdchange"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserchannels } from '@/api/user' // 登录接口
import ArticleList from './components/article-list' // 下拉刷新与上拉加载组件
import ChannelEidt from '@/components/channeleidt' // 弹出框组件
import { mapState } from 'vuex' // 引入vuex的储存数据
import { setItem, getItem } from '@/utils/storage' // 本地储存
import { addChannels, delChannel } from '@/api/channel.js' // 添加频道项
export default {
  name: '',
  // 引入注册使用组件
  components: { ArticleList, ChannelEidt },
  props: {},
  data() {
    return {
      active: 0, // 标签高亮
      channels: [], // 列表数据
      isShoweidt: false // 弹出层隐藏
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadchannels()
  },
  mounted() {},
  methods: {
    async loadchannels() {
      try {
        let channels = []
        // 判断是否登录状态
        if (this.user) {
          const { data } = await getUserchannels()
          channels = data.data.channels
        } else {
          const localchannel = getItem('toutiaopd')
          // 判断本地是否有数据
          if (localchannel) {
            channels = localchannel
          } else {
            // 没有数据显示系统默认
            const { data } = await getUserchannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    // 删除标签
    async editchannel(id) {
      // console.log(id)
      const i = this.channels.findIndex(x => {
        return x.id === id
      })
      this.channels.splice(i, 1)
      // 后台删除
      if (this.user) {
        try {
          await delChannel(id)
        } catch (err) {
          this.$toast('删除频道失败')
        }
      } else {
        setItem('toutiaopd', this.channels)
      }
    },
    // 高亮标签
    activechange(id) {
      this.active = id
      this.isShoweidt = false
    },
    // 添加新标签
    async pdchange(channel) {
      this.channels.push(channel)
      if (this.user) {
        try {
          // 添加后台数据
          await addChannels({
            id: channel.id,
            seq: this.channels.length
          })
        } catch (err) {
          this.$toast('添加频道项失败')
        }
      } else {
        // 添加本地
        setItem('toutiaopd', this.channels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 100px;
  margin-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .left-image {
    width: 200px;
    height: 64px;
  }
  .search-btn {
    width: 455px;
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
