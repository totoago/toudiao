<template>
  <div class="login">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请填写手机号"
        :rules="userFormrules.mobile"
        type="number"
        maxlength="11"
        clearable
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请填写验证码"
        :rules="userFormrules.code"
        maxlength="6"
        clearable
        class="yzm"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isdownshow"
            :time="60*1000"
            format="ss s"
            @finish="isdownshow=false"
          />
          <van-button v-else round class="btncode" native-type="button" @click="sedbtn">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendsms } from '@/api/user'
export default {
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormrules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|6|8|9]\d{9}$/, message: '手机号不对' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位验证码' }
        ]
      },
      isdownshow: false
    }
  },
  created() {},
  methods: {
    async onSubmit() {
      const user = this.user
      // 登录加载
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 获取登录数据
      try {
        const { data: res } = await login(user)
        // console.log('登录成功', res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码失败')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
    async sedbtn() {
      try {
        // 表单验证
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('失败', err)
      }
      // 倒计时显示
      this.isdownshow = true
      try {
        // 获取验证码请求
        await sendsms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // this.isdownshow = false
        if (err.response.status === 429) {
          this.$toast('点击太频繁')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .van-form {
    margin-top: 35px;
  }
  .iconfont {
    font-size: 37px;
  }
  .btncode {
    width: 2.4rem;
    height: 50px;
    background-color: #ededed;
    font-size: 22px;
  }
  .van-count-down {
    width: 130px;
    border-radius: 10px;
    text-align: center;
  }
  .send-sms-btn {
    width: 100px;
  }
  .yzm {
    color: #666666;
  }
  .login-btn-warp {
    background-color: #6db4fb;
    border: none;
    border-radius: 10px;
    margin: 53px 30px;
    .van-button {
      color: #3296fa;
      font-size: 30px;
    }
  }
}
</style>
