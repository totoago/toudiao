<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 联想记忆 -->
    <search-lenovo
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 历史记录 -->
    <search-history v-else />
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchLenovo from './components/search-lenovo'
import searchResult from './components/search-result'
export default {
  name: 'search',
  components: {
    searchHistory,
    searchLenovo,
    searchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      // console.log(val)
      this.searchText = val
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
