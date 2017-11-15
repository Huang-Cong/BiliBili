<template>
  <div class="home">
    <div class="home-page">
      <div class="icon-1"><i class="icon-list2"></i></div>
      <div class="home-list" @click="scrollToEvent(0)" :class="{'current': contentIndex === 0}">
        <i>直播</i>
      </div>
      <div class="home-list" @click="scrollToEvent(1)" :class="{'current': contentIndex === 1}">
        <i>推荐</i>
      </div>
      <div class="home-list" @click="scrollToEvent(2)" :class="{'current': contentIndex === 2}">
        <i>追番</i>
      </div>
      <div class="home-list" @click="scrollToEvent(3)" :class="{'current': contentIndex === 3}">
        <i>专栏</i>
      </div>
      <div class="icon-2">
        <router-link to="/search">
          <i class="icon-search icon-2"></i>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
    <div class="home-content" ref="content">
      <ul class="ul">
        <li class="content">
          <div class="home-lives">
            <a href="#">
              <div class="im-live"><span>我&nbsp;要直&nbsp;播</span></div>
            </a>
            <LiveStream :dataLive="dataLive"></LiveStream>
          </div>
        </li>
        <li class="content">
          <div class="home-recommend">
            <recommend :recommend="recommend" :bannerItem="bannerItem"></recommend>
          </div>
        </li>
        <li class="content">
          <div class="home-toThem">
            <ToThem></ToThem>
          </div>
        </li>
        <li class="content">
          <div class="home-column">
            <Column :dataCol="dataCol"></Column>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import recommend from './recommend/Recommend'
  import LiveStream from './livestream/LiveStream'
  import ToThem from './tothem/ToThem'
  import Column from './column/Column'
  export default {
    props: {
      recommend: {
        type: Array
      },
      bannerItem: {
        type: Array
      },
      dataLive: {
        type: Object
      },
      dataCol: {
        type: Object
      }
    },
    data () {
      return {
        contentIndex: 0,
        listWeight: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.iScrollTranslate()
      })
    },
    methods: {
      scrollToEvent (index) {
        let contentLi = this.$refs.content.getElementsByClassName('content')[index]
        this.contentIndex = index
        this.contentScroll.scrollToElement(contentLi, 300)
      },
      iScrollTranslate () {
        if (this.$refs.content) {
          this.getContentWeight()
          this.contentScroll = new IScroll(this.$refs.content, {
            click: true,
            scrollX: true,
            snap: '.content',
            probeType: 3
          })
          let self = this
          this.contentScroll.on('scroll', function () {
            self.getContentIndex(Math.abs(Math.round(this.x)))
          })
        }
      },
      getContentIndex (num) {
        for (let i = 0; i < this.listWeight.length - 1; i++) {
          let weight = this.listWeight[i]
          if (i + 1 === this.listWeight.length - 1 && num >= weight) {
            this.contentIndex = i
            return
          }
          if (num >= weight && num < this.listWeight[i + 1]) {
            this.contentIndex = i
            return
          }
        }
      },
      getContentWeight () {
        let contentWeight = this.$refs.content.getElementsByClassName('content')
        let weight = 0
        this.listWeight.push(weight)
        for (let i = 0; i < contentWeight.length; i++) {
          let li = contentWeight[i]
          weight += li.clientWidth
          this.listWeight.push(weight)
        }
      }
    },
    components: {
      recommend,
      LiveStream,
      ToThem,
      Column
    }
  }
</script>

<style lang="less">
  .home {
    .home-page {
      position: fixed;
      display: flex;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 45px;
      z-index: 50;
      padding-bottom: 5px;
      line-height: 45px;
      background: #fb7299;
      .home-list {
        display: inline-block;
        list-style: none;
        flex: 1;
        width: 10px;
        text-align: center;
        color: #FFFFFF;
        font-family: Microsoft Yahei;
        &.current {
          i:after {
            position: relative;
            top: -9px;
            display: block;
            content: "";
            width: 30px;
            height: 4px;
            background: #FFFFFF;
            border-radius: 100px;
            margin: 0 auto;
          }
        }
      }
      .icon-2, .icon-1 {
        text-align: center;
        flex: 50px 0 0;
        font-size: 18px;
        line-height: 50px;
        color: #FFFFFF;
        a {
          text-decoration: none;
        }
      }
    }
    .home-content {
      position: relative;
      top: 60px;
      left: 0;
      width: 100%;
      .ul {
        display: inline-block;
        width: 400%;
        .content {
          float: left;
          width: 25%;
          height: 100%;
          background-color: #F4F4F4;
          .home-lives, .home-recommend, .home-toThem, .home-column {
            display: inline-block;
            position: relative;
            width: 100%;
          }
          .home-lives {
            .im-live {
              position: fixed;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              bottom: 20px;
              left: 280px;
              background-color: #fb7299;
              z-index: 100;
              span {
                display: inline-block;
                position: relative;
                left: 22%;
                top: 15%;
                width: 40px;
                height: 40px;
                color: white;
                font-size: 15px;
                font-weight: 700;
                font-family: 微软雅黑;
              }
            }
          }
        }
      }
    }
  }
</style>
