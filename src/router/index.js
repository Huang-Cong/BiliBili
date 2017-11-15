import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '../components/homepage/HomePage'
import Search from '../components/search/Search'
import Video from '../components/videopage/Videopage'
import Partition from '../components/partition/Partition'
import Dynamics from '../components/dynamics/Dynamics'
import News from '../components/news/News'
import Mine from '../components/mine/Mine'

Vue.use(Router)

Router.prototype.goBack = () => {
  this.isBack = true
  window.history.go(-1)
}

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage,
      children: [
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
          path: '/video',
          name: 'Video',
          component: Video
        }
      ]
    },
    {
      path: '/partition',
      name: 'Partition',
      component: Partition,
      children: [{
        path: '/searchPart',
        name: 'Search',
        component: Search
      }]
    },
    {path: '/dynamics', name: 'Dynamics', component: Dynamics},
    {path: '/news', name: 'News', component: News},
    {path: '/mine', name: 'Mine', component: Mine}
  ]
})
