<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">{{user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {},
  computed: {
    ...mapState(['user'])
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.iconfont {
  font-size: 37px;
}
.text {
  font-size: 30px;
}
</style>
