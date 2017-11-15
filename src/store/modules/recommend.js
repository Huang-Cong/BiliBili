/**
 * Created by newuser on 2017/9/19.
 */
import * as types from '../mutation-types'
const state = {
  index: 0,
  timer: 1,
  length: 0,
  videoData: []
}

const getters = {
  getVideo: state => state.videoData
}

const mutations = {
  [types.RECEIVE_LENGTH] (state, length) {
    state.length = length
  },
  GET_VIDEO_DATA (state, data) {
    state.videoData = data
  }
}

// 计时器开始轮播图
const actions = {
  startRecommendTransition ({commit, state}, {obj, objPain}) {
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
  getters,
  mutations,
  actions
}
