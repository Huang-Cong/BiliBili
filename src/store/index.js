/**
 * Created by newuser on 2017/9/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import recommend from './modules/recommend'
import liveStream from './modules/liveStream'
import column from './modules/column'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  modules: {
    recommend,
    liveStream,
    column
  }
})
