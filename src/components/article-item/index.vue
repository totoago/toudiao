<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.images === 3" class="cover-warp">
        <!-- 图片插槽展示 -->
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image :src="img" fit="cover" class="cover-img" />
        </div>
      </div>
      <!-- 内容 -->
      <div class="label-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 1张图片 -->
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
import '@/utils/dayjs.js'
export default {
  name: 'Articleitem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  coputed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  // min-height: 200px;
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-warp {
    display: flex;
    padding: 20px;
    .cover-item {
      flex: 1;
      height: 1px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
