<template>
  <div id = 'app'>
    <a-input placeholder='请输入任务' class='my_ipt' :value='inputVal' @change='handleChangeInput' />
    <a-button type = 'primary' @click='addItemList'>添加事件</a-button>

    <a-list bordered :dataSource='infoList' class='dt_list'>
      <a-list-item slot='renderItem' slot-scope='item'>
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @change='handleChangeCd($event,item.id)'>{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot='actions' @click='delItemById(item.id)'>删除</a>
      </a-list-item>

      <div slot='footer' class='footer'>
        <span>{{unDoneLength}}条剩余</span>
        <a-button-group>
          <a-button :type="key === 'all' ? 'primary' : 'default'" @click="changeActive('all')">全部</a-button>
          <a-button :type="key === 'undone' ? 'primary' : 'default'"  @click="changeActive('undone')">未完成</a-button>
          <a-button :type="key === 'done' ? 'primary' : 'default'" @click="changeActive('done')">已完成</a-button>
        </a-button-group>
        <a @click='clear'>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      // list: [] 4ec11c3b38921ffb0267a1bdb10019bbe55514c0 
      // bcb8a567f6f6a9c6edeb6dc0f080282d4b1b175c
    }
  },
  computed: {
    ...mapState(['inputVal', 'key']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    handleChangeInput (e) {
      console.log(e.target.value)
      this.$store.commit('setInputVal', e.target.value)
    },
    addItemList () {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning('文本内容不能为空！')
      }
      this.$store.commit('addItem', this.inputVal)
    },
    delItemById (id) {
      this.$store.commit('deleteItem', id)
    },
    handleChangeCd (e, id) {
      this.$store.commit('changeCD', {
        done: e.target.checked,
        id: id
      })
    },
    clear () {
      this.$store.commit('clearItems')
    },
    changeActive (key) {
      this.$store.commit('changeKey', key)
    }
  },
  created () {
    this.$store.dispatch('getList')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display:flex;
  justify-content: space-between;
  align-items: center;
}
</style>