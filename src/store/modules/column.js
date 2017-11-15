/**
 * Created by hcLxt on 2017/11/1.
 */
import * as types from '../mutation-types'
const state = {
  index: 0,
  timer: 1,
  length: 0
}

const mutations = {
  [types.RECEIVE_LENGTH] (state, length) {
    state.length = length
  }
}

// 计时器开始轮播图
const actions = {
  startColumnTransition ({commit, state}, {obj, objPain}) {
    clearInterval(state.timer)
    state.timer = setInterval(() => {
      state.index++
      commit(types.ADD_TRANSITION, {obj})
      let offsetX = -state.index * (window.innerWidth * 0.95) + 'px'
      commit(types.SET_TRANSLATE, {x: offsetX, y: 0, z: 0, obj})
      commit(types.SMALL_POINT, objPain)
      if (state.index > 6) {
        state.index = 0
      }
    }, 1500)
  }
}

export default {
  state,
  mutations,
  actions
}
