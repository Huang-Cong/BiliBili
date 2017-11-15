<template>
  <div class="scroll" ref="recommend">
    <div class="home-recommend">
      <div ref="PullDown" style="display: none;" class="pull">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <div class="recommend">
        <span class="font">综合</span>
        <div class="icon">
          <i class="icon-stats-bars2"></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="icon-price-tags"></i>
        </div>
      </div>
      <div class="recommend-banner">
        <ul class="recommend-ul" ref="banner">
          <li v-for="(item, index) in bannerItem.concat([bannerItem[0]])" @click="scrollList(index)">
            <a :href="item.uri"><img :src="item.image" class="banner-image"></a>
          </li>
        </ul>
        <ul class="small-point" ref="point">
          <li v-for="item in bannerItem"></li>
        </ul>
      </div>
      <div class="recommend-content" ref="recommend">
        <ul>
          <router-link to="/video">
            <li class="recommend-content-list" v-for="item in recommend" @click="acquiringList(item)">
              <div class="content-align">
                <div class="content-top">
                  <img :src="item.cover">
                  <div class="icon-content">
                    <div class="one">
                      <i class="icon-play icon-2">
                        <span class="recommend-span">{{getPlay(item.play)}}</span></i>
                    </div>
                    <div class="two">
                      <i class="icon-paragraph-center icon-3"><span>{{item.danmaku}}</span></i>
                    </div>
                    <div class="three">
                      <span class="play-time">{{getTime(item.duration)}}</span>
                    </div>
                  </div>
                </div>
                <div class="content-bottom">
                  <p class="bottom-text">
                    {{item.title}}
                  </p>
                  <div class="bottom-bottom">
                    <div class="classification">
                      {{item.tname}} · {{item.tag.tag_name}}
                    </div>
                    <i class="icon-flickr icon-1" v-show="item.tname"></i>
                  </div>
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <router-view></router-view>
      </div>
      <div ref="PullUp" style="display: none;" class="pull-up">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <button ref="loadBtn" class="btn but" @click="clickLoad">点击加载</button>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import {mapMutations, mapActions} from 'vuex'
  export default {
    props: {
      bannerItem: {
        type: Array
      },
      recommend: {
        type: Array
      }
    },
    data () {
      return {
        endX: 0,
        startX: 0,
        deltaX: 0,
        isPulled: false
      }
    },
    methods: {
      ...mapActions(['startRecommendTransition', 'linstenTranstionEnd', 'transitionAgain']),
      ...mapMutations(['RECEIVE_LENGTH', 'GET_VIDEO_DATA']),
      iScrollRecommend () {
        let pullDown = this.$refs.PullDown
        this.RecommendScroll = new IScroll(this.$refs.recommend, {
          click: true,
          probeType: 3
        })
        this.RecommendScroll.on('scroll', function () {
          let height = this.y
          if (height >= 80) {
            pullDown.style.display = 'block'
            this.isPulled = true
          } else if (height < 10 && height >= 0) {
            setTimeout(() => {
              pullDown.style.display = 'none'
            }, 5000)
          }
        })
      },
      clickLoad () {
        let pullUp = this.$refs.PullUp
        let loadBtn = this.$refs.loadBtn
        pullUp.style.display = 'block'
        pullUp.style.bottom = '-50px'
        loadBtn.style.display = 'none'
        this.isPulled = true
        setTimeout(() => {
          pullUp.style.display = 'none'
          loadBtn.style.display = 'block'
        }, 5000)
      },
      callback () {
        this.transitionAgain({obj: this.$refs.banner, modules: 'recommend'})
      },
      acquiringList (item) {
        this.GET_VIDEO_DATA(item)
      },
      scrollList (index) {
        let contentTouch = this.$refs.banner
        contentTouch.addEventListener('touchstart', (event) => {
          this.startX = event.touches[0].clientX
        })
        contentTouch.addEventListener('touchmove', (e) => {
          this.endX = e.touches[0].clientX
          this.deltaX = this.endX - this.startX
        })
        contentTouch.addEventListener('touchend', () => {
          if (Math.abs(this.deltaX) > window.innerWidth / 3) {
            if (this.deltaX > 0) {
              index--
            } else {
              index++
            }
            contentTouch.style.transition = 'all 0.5s'
            contentTouch.style.transform = 'translateX(' + (-index * window.innerWidth) + 'px)'
            this.startX = 0
            this.endX = 0
            this.deltaX = 0
          }
        })
      },
      getTime (currentTime) {
        return parseInt(currentTime / 60) + ':' + parseInt(currentTime % 60 >= 10 ? currentTime % 60 : '0' + currentTime % 60)
      },
      getPlay (currentPlay) {
        return currentPlay > 10000 ? (currentPlay / 10000).toFixed(1) + '万' : currentPlay
      }
    },
    created () {
      this.$nextTick(() => {
        this.iScrollRecommend()
        this.RECEIVE_LENGTH(this.$refs.banner.getElementsByTagName('li').length - 1)
        let objPain = this.$refs.point.getElementsByTagName('li')
        let obj = this.$refs.banner
        this.startRecommendTransition({obj, objPain})
        this.linstenTranstionEnd({obj, callback: this.callback})
      })
    },
    watch: {
      bannerItem (val) {
        if (val) {
          this.$nextTick(() => { // 等待整个页面渲染完毕之后再获取ul
            this.RECEIVE_LENGTH(this.$refs.banner.getElementsByTagName('li').length - 1)
            let objPain = this.$refs.point.getElementsByTagName('li')
            let obj = this.$refs.banner
            this.startRecommendTransition({obj, objPain})
            this.linstenTranstionEnd({obj, callback: this.callback})
            this.iScrollRecommend()
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../../common/less/mixin";

  .home-recommend {
    .pull {
      position: relative;
      .spinner {
        margin: 0 auto;
        width: 50px;
        height: 60px;
        text-align: center;
        font-size: 10px;
      }
      .spinner > div {
        background-color: #fb7299;
        height: 100%;
        width: 6px;
        display: inline-block;
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
      }
      .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
      }
      .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
      }
      .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }
      .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
      }
      @-webkit-keyframes stretchdelay {
        0%, 40%, 100% {
          -webkit-transform: scaleY(0.4)
        }
        20% {
          -webkit-transform: scaleY(1.0)
        }
      }
      @keyframes stretchdelay {
        0%, 40%, 100% {
          transform: scaleY(0.4);
          -webkit-transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1.0);
          -webkit-transform: scaleY(1.0);
        }
      }
    }
    .recommend {
      position: relative;
      width: 100%;
      height: 33px;
      line-height: 33px;
      color: #999999;
      border-bottom: 1px solid #E7E7E7;
      .font {
        padding-left: 15px;
      }
      .icon {
        position: absolute;
        right: 15px;
        top: 0;
        color: #fb7299;
      }
    }
    .recommend-banner {
      position: relative;
      width: 95%;
      margin: 10px;
      overflow: hidden;
      .recommend-ul {
        width: 1000%;
        .banner-image {
          border-radius: 8px;
          float: left;
          width: 10%;
        }
      }
      .small-point {
        position: absolute;
        bottom: 10px;
        left: 90%;
        margin-left: -59px;
        width: 100px;
        height: 6px;
        font-size: 0;
        li {
          float: left;
          margin-left: 10px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #fff;
        }
        .now {
          background: #fb7299;
        }
      }
    }
    .recommend-content {
      position: relative;
      width: 95%;
      margin-left: 14px;
      ul {
        position: relative;
        width: 100%;
        .recommend-content-list {
          position: relative;
          width: 50%;
          float: left;
          margin-bottom: 10px;
          .content-align {
            width: 10%;
            .content-top {
              position: relative;
              img {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                width: 950%;
                height: 115px;
              }
              .icon-content {
                position: absolute;
                display: flex;
                width: 100%;
                top: 93px;
                left: 8px;
                .one {
                  flex: 1;
                  .icon-2 {
                    position: relative;
                    width: 100%;
                    font-size: 12px;
                    color: #FFFFFF;
                    .recommend-span {
                      position: absolute;
                      width: 100%;
                      white-space: nowrap;
                      font-size: 12px;
                      color: #FFFFFF;
                      top: 0;
                      left: 15px;
                    }
                  }
                }
                .two {
                  flex: 1;
                  .icon-3 {
                    position: relative;
                    font-size: 12px;
                    top: 1px;
                    left: 40px;
                    color: #FFFFFF;
                    span {
                      position: relative;
                      font-size: 12px;
                      color: #FFFFFF;
                      left: 3px;
                    }
                  }
                }
                .three {
                  flex: 10px 0 0;
                  .play-time {
                    position: absolute;
                    top: 2px;
                    left: 125px;
                    font-size: 12px;
                    color: #FFFFFF;
                    z-index: 50;
                  }
                }
              }
            }
            .content-bottom {
              position: relative;
              font-size: 0;
              border-color: #F4F4F4;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
              .bottom-text {
                position: relative;
                width: 950%;
                height: 50px;
                padding: 10px;
                font-size: 14px;
                text-align: left;
                overflow: hidden;
                color: black;
                text-overflow: ellipsis;
              }
              .bottom-bottom {
                position: relative;
                display: flex;
                width: 950%;
                height: 30px;
                top: -10px;
                color: #C8C8C8;
                .classification {
                  flex: 1;
                  font-size: 14px;
                  line-height: 30px;
                  padding-left: 10px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .icon-1 {
                  flex: 0 0 10px;
                  font-size: 10px;
                  line-height: 30px;
                  padding-right: 10px;
                }
              }
            }
          }
        }
      }
    }
    .but {
      position: relative;
      margin: 10px 10px 15px 10px;
      width: 95%;
      background-color: #eeeeee;
      border-radius: 8px;
    }
    .pull-up {
      position: fixed;
      bottom: 0;
      left: 43.5%;
      z-index: 50;
      .spinner {
        margin: 0 auto;
        width: 50px;
        height: 60px;
        text-align: center;
        font-size: 10px;
      }
      .spinner > div {
        background-color: #fb7299;
        height: 100%;
        width: 6px;
        display: inline-block;
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
      }
      .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
      }
      .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
      }
      .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }
      .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
      }
      @-webkit-keyframes stretchdelay {
        0%, 40%, 100% {
          -webkit-transform: scaleY(0.4)
        }
        20% {
          -webkit-transform: scaleY(1.0)
        }
      }
      @keyframes stretchdelay {
        0%, 40%, 100% {
          transform: scaleY(0.4);
          -webkit-transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1.0);
          -webkit-transform: scaleY(1.0);
        }
      }
    }
  }
</style>
