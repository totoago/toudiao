<template>
  <div>
    联想记忆
    <van-cell
      icon="search"
      v-for="(val, index) in lenovo"
      :key="index"
      @click="$emit('search', val)"
    >
      <span slot="title" v-html="heightlight(val)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getLenovo } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchLenovo',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lenovo: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 延迟防抖
      handler: debounce(function(value) {
        // console.log(value)
        this.onloadlenovo(value)
      }, 1000),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onloadlenovo() {
      try {
        const { data } = await getLenovo(this.searchText)
        console.log(data)
        this.lenovo = data.data.options
      } catch (err) {
        this.$toast('联想搜索失败')
      }
    },
    // 文字高亮显示
    heightlight(val) {
      const hlStr = `<span class='active'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return val.replace(reg, hlStr)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-cell__title {
  color: red;
}
</style>
