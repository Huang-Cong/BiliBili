/**
 * Created by newuser on 2017/9/20.
 */
import * as types from './mutation-types'
export const linstenTranstionEnd = (context, {obj, callback}) => {
  if (typeof obj === 'object') {
    obj.addEventListener('webkitTransitionEnd', () => {
      callback && callback()
    })
    obj.addEventListener('transitionEnd', () => {
      callback && callback()
    })
  }
}

export const transitionAgain = ({state, commit}, {obj, modules}) => {
  if (state[modules].index >= state[modules].length) {
    commit(types.REMOVE_TRANSITION, {obj})
    commit(types.SET_TRANSLATE, {x: 0, y: 0, z: 0, obj})
    state[modules].index = 0
  }
}

