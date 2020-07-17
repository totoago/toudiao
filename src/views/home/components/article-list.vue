<template>
  <div class="article-list">
    <!-- 下拉刷新添加数据 -->
    <van-pull-refresh
      v-model="isrefLoading"
      @refresh="onRefresh"
      :success-text="successlist"
      :success-duration="1500"
    >
      <!-- 上移加载刷新功能 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- 自定义组件 -->
        <article-item :article="article" v-for="(article, index) in list" :key="index" />
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: '',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 获取数据列表
      loading: false, // 加载状态
      finished: false, // 加载结束状态
      error: false, // 错误提示
      timestamp: null, // 时间戳
      // 下拉刷新
      isrefLoading: false, // 下拉刷新状态
      successlist: '刷新成功'
    }
  },
  coputed: {},
  watch: {},
  created() {
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)
        // 加载剩余下一页
        this.loading = false
        if (this.list) {
          this.timestamp = data.data.pre_timestamp
        } else {
          // 加载完成
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        // 方法1
        // this.list.unshift(...results)
        // 方法2
        this.list = results

        this.isrefLoading = false
        this.successlist = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isrefLoading = false
        this.successlist = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  // 视口数据切换保留
  height: 79vh;
  overflow: auto;
}
</style>
