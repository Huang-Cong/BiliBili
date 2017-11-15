/**
 * Created by newuser on 2017/9/19.
 */
import * as types from './mutation-types'

export default {
  [types.ADD_TRANSITION] (state, {obj}) {
    obj.style.transition = 'all 0.5s'
    obj.style.webkitTransition = 'all 0.5s'
  },
  [types.REMOVE_TRANSITION] (state, {obj}) {
    obj.style.transition = 'none'
    obj.style.webkitTransition = 'none'
  },
  [types.SET_TRANSLATE] (state, {x, y, z, obj}) {
    obj.style.transform = `translate3D(${x},${y},${z})`
    obj.style.webkitTransform = `translate3D(${x},${y},${z})`
  },
  [types.SMALL_POINT] (state, objPain) {
    for (let i = 0; i < objPain.length; i++) {
      objPain[i].className = ''
    }
    let num = state.recommend.index
    if (state.recommend.index >= 5) {
      num = 0
    } else if (state.recommend.length <= 0) {
      num = 5
    }
    objPain[num].className = 'now'
  }
}
