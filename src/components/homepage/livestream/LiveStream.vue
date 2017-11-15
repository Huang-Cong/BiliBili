<template>
  <div class="scroll" ref="lives">
    <div class="home-live">
      <div ref="pullDown" style="display: none;" class="pull">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <div class="input">
        <font class="live-input">
          <span class="icon-search"></span>
          <input type="search" placeholder="搜索房间或主播">
        </font>
      </div>
      <div class="live-banner">
        <ul class="live-ul" ref="bannerLive">
          <li v-for="(item, index) in dataLive.banner.concat([dataLive.banner[0]])">
            <a :href="item.link"><img :src="item.img" class="banner-image"></a>
          </li>
        </ul>
        <ul class="small-point" ref="pointLive">
          <li v-for="item in dataLive.banner"></li>
        </ul>
      </div>
      <div class="entrance-icons">
        <ul>
          <li v-for="item in dataLive.partitions">
            <div>
              <a :href="'http://live.bilibili.com/pages/h5/area?id='+item.partition.id+'&name='+item.partition.name">
                <img :src="item.partition.sub_icon.src"><br>
                {{item.partition.name}}
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="live-content">
        <div class="content-live-text">
          <div class="live-text">
            <img :src="dataLive.recommend_data.partition.sub_icon.src" width="20" height="20">
            <span class="recommend-live">{{dataLive.recommend_data.partition.name}}</span>
            <span class="the-current">当前<span class="num-live">{{dataLive.recommend_data.partition.count}}</span>个直播，进去看看&nbsp;
            <i class="icon-circle-right icon-live"></i></span>
          </div>
          <div class="content-live-list">
            <ul>
              <li class="live-list" v-for="item in dataLive.recommend_data.lives">
                <a :href="'//live.bilibili.com/h5/'+item.room_id">
                  <div class="live-list-content">
                    <div class="live-top">
                      <img :src="item.cover.src">
                      <span class="live-name">{{item.owner.name}}</span>
                    </div>
                    <div class="live-bottom">
                      <p class="live-bottom-text">{{item.title}}</p>
                      <div class="live-bottom-content">
                        <span class="live-bottom-area">{{item.area_v2_name}}</span>
                        <div class="live-icon">
                          <i class="icon-cool"></i>
                          <span class="live-span">{{getOnline(item.online)}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul>
            <li class="live-text" v-for="item in dataLive.partitions">
              <img :src="item.partition.sub_icon.src" width="20" height="20">
              <span class="recommend-live">{{item.partition.name}}</span>
              <span class="the-current">当前
                <span class="num-live">
                  {{item.partition.count}}
                </span>个直播，进去看看&nbsp;
                <i class="icon-circle-right icon-live"></i>
              </span>
              <div class="content-live-list">
                <ul class="nav-lives">
                  <li class="live-list" v-for="item in item.lives">
                    <a :href="'//live.bilibili.com/h5/'+item.roomid">
                      <div class="live-list-content">
                        <div class="live-top">
                          <img :src="item.user_cover">
                          <span class="live-name">{{item.uname}}</span>
                        </div>
                        <div class="live-bottom">
                          <p class="live-bottom-text">{{item.title}}</p>
                          <div class="live-bottom-content">
                            <span class="live-bottom-area">{{item.area_name}}</span>
                            <div class="live-icon">
                              <i class="icon-cool"></i>
                              <span class="live-span">{{getOnline(item.online)}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button class="btn but">全部直播</button>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import {mapMutations, mapActions} from 'vuex'
  export default {
    props: {
      dataLive: {
        type: Object
      }
    },
    data () {
      return {isPulled: false}
    },
    methods: {
      ...mapActions(['startLiveTransition', 'linstenTranstionEnd', 'transitionAgain']),
      ...mapMutations(['RECEIVE_LENGTH', 'REMOVE_TRANSITION', 'SET_TRANSLATE']),
      iScrollLives () {
        let pullDown = this.$refs.pullDown
        this.livesScroll = new IScroll(this.$refs.lives, {
          click: true,
          probeType: 3
        })
        this.livesScroll.on('scroll', function () {
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
      callback () {
        this.transitionAgain({obj: this.$refs.bannerLive, modules: 'liveStream'})
      },
//      scrollList (index) {
//        console.log(index)
//        let contentTouch = this.$refs.bannerLive
//        let objPain = this.$refs.pointLive.getElementsByTagName('li')
//        let offsetX = -index * (window.innerWidth * 0.95)
//        contentTouch.addEventListener('touchstart', (event) => {
//          clearInterval('liveStream.state.time')
//          this.startX = event.touches[0].clientX
//        })
//        contentTouch.addEventListener('touchmove', (e) => {
//          this.endX = e.touches[0].clientX
//          this.deltaX = this.endX - this.startX
//          this.REMOVE_TRANSITION({obj: contentTouch})
//          this.SET_TRANSLATE({x: (offsetX + this.deltaX + 'px'), y: 0, z: 0, obj: contentTouch})
//        })
//        contentTouch.addEventListener('touchend', () => {
//          if (Math.abs(this.deltaX) > window.innerWidth / 3) {
//            if (this.deltaX > 0) {
//              index--
//            } else {
//              index++
//            }
//          }
//          contentTouch.style.transition = 'all 0.5s'
//          this.SET_TRANSLATE({x: offsetX, y: 0, z: 0, obj: contentTouch})
//          this.startX = 0
//          this.endX = 0
//          this.deltaX = 0
//          this.startLiveTransition({obj: contentTouch, objPain})
//        })
//      },
      getOnline (currentOnline) {
        return currentOnline > 10000 ? (currentOnline / 10000).toFixed(1) + '万' : currentOnline
      }
    },
    created () {
      this.$nextTick(() => {
        this.iScrollLives()
        this.RECEIVE_LENGTH(this.$refs.bannerLive.getElementsByTagName('li').length - 1)
        let objPain = this.$refs.pointLive.getElementsByTagName('li')
        let obj = this.$refs.bannerLive
        this.startLiveTransition({obj, objPain})
        this.linstenTranstionEnd({obj, callback: this.callback})
      })
    },
    watch: {
      dataLive (val) {
        if (val) {
          this.$nextTick(() => { // 等待整个页面渲染完毕之后再获取ul
            this.RECEIVE_LENGTH(this.$refs.bannerLive.getElementsByTagName('li').length - 1)
            let objPain = this.$refs.pointLive.getElementsByTagName('li')
            let obj = this.$refs.bannerLive
            this.startLiveTransition({obj, objPain})
            this.linstenTranstionEnd({obj, callback: this.callback})
            this.iScrollLives()
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .scroll {
    width: 100%;
    height: 562px;
    overflow: hidden;
    .home-live {
      .pull {
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
      .input {
        position: relative;
        width: 95%;
        height: 30px;
        border-radius: 8px;
        line-height: 30px;
        left: 10px;
        top: 3px;
        background-color: #E8E8E8;
        .live-input {
          position: relative;
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          padding-left: 10px;
          .icon-search {
            position: relative;
            font-size: 10px;
            color: #999999;
          }
          input {
            position: absolute;
            width: 1500%;
            padding: 0 10px 0 5px;
            border-radius: 8px;
            border: none;
            font-size: 12px;
            z-index: 3;
            color: #999999;
            background-color: #E8E8E8;
          }
        }
      }
      .live-banner {
        position: relative;
        width: 95%;
        margin: 10px;
        overflow: hidden;
        top: 3px;
        .live-ul {
          display: inline-block;
          width: 1000%;
          height: 100%;
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
      .entrance-icons {
        position: relative;
        top: 10px;
        ul {
          width: 100%;
          display: flex;
          li {
            float: left;
            flex: 1;
            text-align: center;
            a {
              color: #000;
            }
          }
        }
      }
      .live-content {
        position: relative;
        top: 20px;
        .live-text {
          position: relative;
          left: 12px;
          .recommend-live {
            position: relative;
            top: 2px;
          }
          .the-current {
            position: absolute;
            top: -3px;
            right: 20px;
            color: #929292;
            .num-live {
              color: #fb7299;
            }
            .icon-live {
              position: relative;
              top: 4px;
              font-size: 20px;
            }
          }
        }
        .content-live-list {
          position: relative;
          width: 95%;
          left: 14px;
          ul {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 100%;
            .live-list {
              position: relative;
              width: 50%;
              float: left;
              margin-bottom: 10px;
              top: 15px;
              & > a {
                color: #212121;
              }
              .live-list-content {
                width: 10%;
                .live-top {
                  position: relative;
                  img {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    width: 950%;
                    height: 115px;
                  }
                  .live-name {
                    position: absolute;
                    white-space: nowrap;
                    bottom: 8px;
                    left: 10px;
                    color: white;
                  }
                }
                .live-bottom {
                  position: relative;
                  font-size: 0;
                  border-color: #F4F4F4;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
                  .live-bottom-text {
                    position: relative;
                    width: 950%;
                    height: 50px;
                    padding: 10px;
                    font-size: 13px;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  .live-bottom-content {
                    position: relative;
                    display: flex;
                    width: 950%;
                    height: 30px;
                    top: -15px;
                    color: #C8C8C8;
                    .live-bottom-area {
                      flex: 1;
                      font-size: 12px;
                      line-height: 30px;
                      padding-left: 10px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                    .live-icon {
                      flex: 0 0 55px;
                      font-size: 10px;
                      line-height: 30px;
                    }
                  }
                }
              }
            }
          }
        }
        .nav-lives {
          position: relative;
          left: -14px;
        }
      }
      .but {
        position: relative;
        margin: 10px 10px 15px 10px;
        width: 95%;
        background-color: #eeeeee;
        border-radius: 8px;
      }
    }
  }
</style>
