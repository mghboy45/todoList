import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputVal: 'aaa',
    nextId: 5,
    key: 'all'
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(item => item.done === false).length
    },
    infoList (state) {
      if (state.key === 'all') {
        return state.list
      }

      if (state.key === 'undone') {
        return state.list.filter(item => !item.done)
      }

      if (state.key === 'done') {
        return state.list.filter(item => item.done)
      }
      return state.list
    }
  },
  mutations: {
    initList (state, data) {
      state.list = data
    },
    setInputVal (state, data) {
      state.inputVal = data
    },
    addItem (state, data) {
      let obj = {
        id: state.nextId,
        info: state.inputVal.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputVal = ''
    },
    deleteItem (state, id) {
      let i = state.list.findIndex(item => item.id === id)
      if (i >= -1) {
        state.list.splice(i, 1)
      }
    },
    changeCD (state, data) {
      state.list.map(item => {
        if (item.id === data.id) {
          item.done = data.done
        }
      })
    },
    clearItems (state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeKey (state, key) {
      state.key = key
    }
  },
  actions: {
    getList(context) {
      axios.get('../../static/list.json').then(({data}) => {
        context.commit('initList', data)
      })
    }
  }
})