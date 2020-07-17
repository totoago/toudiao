// 频道编辑组件
<template>
  <div class="channeleidt">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        plain
        type="danger"
        size="small"
        round
        class="edit-btn"
        @click="isEdit=!isEdit"
      >{{isShow}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="mygrid">
      <van-grid-item v-for="(value, index) in myChannel" :key="index" class="grid-item">
        <van-icon slot="icon" name="clear" v-show="isEdit && !fixchange.includes(value.id)"></van-icon>
        <span
          slot="text"
          class="text"
          :class="{ active: value.id === active }"
          @click="mychannelBtn(value.id)"
        >
          {{
          value.name
          }}
        </span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-item">
      <van-grid-item
        v-for="channel in recommendChannel"
        :key="channel.id"
        :text="channel.name"
        icon="plus"
        class="grid-item"
        @click="channelpd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllchannel } from '@/api/channel.js'
export default {
  name: '',
  components: {},
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      recommend: [], // 所有频道数据
      isEdit: false, // 不显示删除图标
      fixchange: [0] // 取消不删除标签
    }
  },
  computed: {
    recommendChannel() {
      // 过滤不同数据显示
      return this.recommend.filter(channel => {
        return !this.myChannel.find(channels => {
          return channels.id === channel.id
        })
      })
    },
    // cpm(){
    //   return this.Allchannel.filter(channel=>{
    //     return this.mychennel.find(x=>{
    //      return x.id===channel.id
    //     })
    //   })
    // }
    // 编辑、完成显示
    isShow() {
      return this.isEdit ? '完成' : '编辑'
    }
  },
  created() {
    this.loadAllchannel()
  },
  mounted() {},
  methods: {
    async loadAllchannel() {
      try {
        // 获取所有频道数据
        const { data } = await getAllchannel()
        console.log(data)
        this.recommend = data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    mychannelBtn(id) {
      if (this.isEdit) {
        // 删除标签
        this.$emit('changechannel', id)
      } else {
        // 更改索引显示高亮
        this.$emit('changeActive', id)
      }
    },
    channelpd(channel) {
      // 添加新标签
      this.$emit('changepd', channel)
    }
  }
}
</script>

<style lang="less" scoped>
.channeleidt {
  padding-top: 80px;
  .title-text {
    font-size: 32px;
    color: #000;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 87px;
    .van-grid-item__content,
    .text {
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        color: #ccc;
        z-index: 2;
      }
    }
  }
  /deep/.mygrid {
    .grid-item {
      .van-grid-item__content {
        .van-grid-item__icon-wrapper {
          position: unset;
        }
      }
      .text {
        background-color: #f4f5f6;
        font-size: 30px;
        color: #222;
      }

      .active {
        color: red;
      }
    }
  }
  /deep/.recommend-item {
    .grid-item {
      .van-grid-item__content {
        white-space: nowarp;
        background-color: #f4f5f6;
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
