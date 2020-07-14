<template>
  <div class="header">
    <div class="login" v-if="user" :v-model="userinfo">
      <!-- 登录 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="contain" :src="userinfo.photo" />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <span>编辑资料</span>
        </div>
      </div>
      <div class="toutiao">
        <div class="item">
          <span class="count">{{userinfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="item">
          <span class="count">{{userinfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="item">
          <span class="count">{{userinfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="item">
          <span class="count">{{userinfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录头部 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2" clickable class="m9">
      <van-grid-item class="grid-nav">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-nav">
        <i slot="icon" class="iconfont iconlishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="m9" />
    <van-cell title="退出登录" clickable class="logout-cell" @click="logout" v-if="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getlist } from '@/api/user'
export default {
  data() {
    return {
      userinfo: []
    }
  },
  created() {
    this.getuserlist()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getuserlist() {
      try {
        const { data: res } = await getlist()
        // console.log(data)
        this.userinfo = res.data
      } catch (err) {
        console.log('获取失败')
      }
    },
    logout() {
      this.$dialog
        .confirm({
          title: '退出登录？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$router.back()
        })
        .catch(() => {
          console.log('取消登录')
        })
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 361px;
  background: url('~@/assets/banner.png');
}
.base-info {
  height: 231px;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 132px;
      height: 132px;
      border: 4px solid #fff;
      margin-right: 23px;
    }
    .name {
      font-size: 30px;
      color: #fff;
    }
  }
  .right span {
    color: #000000;
    font-size: 20px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
  }
}
.toutiao {
  height: 130px;
  display: flex;
  justify-content: space-around;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .count {
      // padding-bottom: 18px;
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.grid-nav {
  height: 141px;
  i {
    font-size: 47px;
  }
  .iconshoucang {
    color: #eb5253;
  }
  .iconlishi {
    color: #ff9d1d;
  }
  span {
    font-size: 28px;
  }
}
.logout-cell {
  text-align: center;
  color: #d86262;
}
.m9 {
  margin-bottom: 5px;
}
</style>
