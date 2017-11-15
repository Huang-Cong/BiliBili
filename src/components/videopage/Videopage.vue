<template>
  <transition :name="transitionName">
    <div class="video-page child-view-video">
      <div class="return">
        <i @click="goBack" class="icon-circle-left"></i>
        <span class="video-id">AV{{videoData.param}}</span>
        <i class="icon-point-right"></i>&nbsp;&nbsp;
        <i class="icon-flickr"></i>
      </div>
      <video class="vid" controls src=""></video>
      <div class="video-title">
        <ul class="video-ul">
          <li class="video-li" @click="scrollToEventVideo(0)" :class="{'current': videoIndex === 0}">
            <i>简介</i>
          </li>
          <li class="video-li" @click="scrollToEventVideo(1)" :class="{'current': videoIndex === 1}">
            <i>评论</i><span class="reply">{{videoData.reply}}</span>
          </li>
        </ul>
      </div>
      <div class="video-content" ref="videoContentUl">
        <ul class="video-content-ul">
          <li class="video-content-li">
            <div class="video-text" @click="getHeight()">
              <p class="video-p">{{videoData.title}}</p>
              <i class="icon-circle-down icon-video" ref="iconVideo"></i>
            </div>
            <div class="video-num" @click="getHeight()">
              <div class="video-two"><i class="icon-play"><span>&nbsp;{{lookPlay(videoData.play)}}</span></i></div>
              <div class="video-two"><i class="icon-paragraph-center"><span>&nbsp;{{videoData.danmaku}}</span></i></div>
              <div class="video-two">9-22</div>
              <div class="video-two last">未经作者授权禁止转载</div>
            </div>
            <div class="video-desc" ref="desc" @click="getHeight()">
              <div class="desc-p">{{videoData.desc}}</div>
            </div>
            <div class="video-icon-list">
              <div class="icon-list">
                <i class="icon-point-right icon-list-one"></i><br>
                <span>{{videoData.like}}</span>
              </div>
              <div class="icon-list">
                <i class="icon-coin-yen icon-list-two"></i><br>
                <span>{{videoData.coin}}</span>
              </div>
              <div class="icon-list">
                <i class="icon-star-empty icon-list-three"></i><br>
                <span>{{videoData.favorite}}</span>
              </div>
              <div class="icon-list">
                <i class="icon-download2 icon-list-four"></i><br>
                <span>缓存</span>
              </div>
              <div class="icon-list">
                <i class="icon-history icon-list-five"></i><br>
                <span>{{videoData.share}}</span>
              </div>
            </div>
            <div class="video-reason">
              <div class="video-img">
                <img :src="videoData.face">
              </div>
              <div class="video-name">
                <span class="video-name-one">{{videoData.name}}</span><br>
                <span class="video-name-two">{{videoData.fans}}人关注</span>
              </div>
              <div class="video-btn">
                <button class="btn video-btn-one">充电</button>
                <button class="btn video-btn-two">关注</button>
              </div>
            </div>
            <div class="video-tag">
              <span class="video-tag-name">{{videoData.tag.tag_name}}</span>
              <i class="icon-circle-down video-tag-icon"></i>
            </div>
          </li>
          <li class="video-content-li">
            <p style="text-align: center; font-size: 20px; color: black">评论区</p>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'
  export default {
    data () {
      return {
        transitionName: 'slide-left',
        videoData: null,
        descHeight: false,
        videoIndex: 0,
        listWeight: []
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    },
    computed: {
      ...mapGetters(['getVideo'])
    },
    methods: {
      goBack () {
        this.$router.goBack()
      },
      lookPlay (current) {
        return current > 10000 ? (current / 10000).toFixed(1) + '万' : current
      },
      getHeight () {
        let desc = this.$refs.desc
        let iconVideo = this.$refs.iconVideo
        this.descHeight = !this.descHeight
        if (this.descHeight === true) {
          desc.style.height = '100%'
          iconVideo.className = 'icon-circle-up icon-video'
        } else {
          desc.style.height = '50px'
          iconVideo.className = 'icon-circle-down icon-video'
        }
      },
      scrollToEventVideo (index) {
        let contentList = this.$refs.videoContentUl.getElementsByClassName('video-content-li')[index]
        this.videoIndex = index
        this.videoContentUl.scrollToElement(contentList, 300)
      },
      iScrollVideo () {
        if (this.$refs.videoContentUl) {
          this.getVideoWeight()
          this.videoContentUl = new IScroll(this.$refs.videoContentUl, {
            click: true,
            scrollX: true,
            snap: '.video-content-li',
            probeType: 3
          })
          let self = this
          this.videoContentUl.on('scroll', function () {
            self.getVideoIndex(Math.abs(Math.round(this.x)))
          })
        }
      },
      getVideoIndex (num) {
        for (let i = 0; i < this.listWeight.length - 1; i++) {
          let weight = this.listWeight[i]
          if (i + 1 === this.listWeight.length - 1 && num >= weight) {
            this.videoIndex = i
            return
          }
          if (num >= weight && num < this.listWeight[i + 1]) {
            this.videoIndex = i
            return
          }
        }
      },
      getVideoWeight () {
        let contentWeight = this.$refs.videoContentUl.getElementsByClassName('video-content-li')
        let weight = 0
        this.listWeight.push(weight)
        for (let i = 0; i < contentWeight.length; i++) {
          let li = contentWeight[i]
          weight += li.clientWidth
          this.listWeight.push(weight)
        }
      }
    },
    created () {
      this.videoData = this.getVideo
      this.$nextTick(() => {
        this.iScrollVideo()
      })
    }
  }
</script>

<style lang="less">
  .child-view-video {
    position: absolute;
    width: 100%;
    transition: all .8s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .video-page {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 500;
    .return {
      position: relative;
      font-size: 20px;
      margin: 5px 0 0 12px;
      color: white;
      z-index: 500;
      .video-id {
        position: relative;
        margin: 0 16% 0 25%;
        color: #333333;
      }
    }
    .vid {
      position: absolute;
      top: 0;
      width: 100%;
      height: 200px;
      background-color: black;
    }
    .video-title {
      position: relative;
      top: 150px;
      text-align: center;
      .video-ul {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 25px;
        .video-li {
          position: relative;
          width: 50%;
          height: 100%;
          line-height: 25px;
          float: left;
          color: #999999;
          font-size: 16px;
          .reply {
            position: absolute;
            left: 120px;
            top: 1px;
            padding: 0 5px;
            line-height: 18px;
            text-align: center;
            color: #fb7299;
            font-size: 12px;
            border: 1px solid #fb7299;
            border-radius: 15px;
          }
          &:first-child {
            border-right: 1px solid #C7C7C7;
          }
          &.current {
            color: #fb7299;
            i:after {
              position: relative;
              top: 3px;
              display: block;
              content: "";
              width: 60px;
              height: 4px;
              background: #fb7299;
              border-radius: 100px;
              margin: 0 auto;
            }
          }
        }
      }
    }
    .video-content {
      position: relative;
      top: 145px;
      .video-content-ul {
        position: relative;
        display: inline-block;
        width: 200%;
        height: 100%;
        .video-content-li {
          position: relative;
          display: inline-block;
          width: 50%;
          height: 100%;
          float: left;
          .video-text {
            position: relative;
            width: 100%;
            .video-p {
              position: relative;
              width: 90%;
              line-height: 25px;
              left: 13px;
              font-size: 14px;
              text-align: left;
              color: black;
            }
            .icon-video {
              position: absolute;
              left: 93%;
              top: 4px;
              font-size: 16px;
              color: #cccccc;
            }
          }
          .video-num {
            position: relative;
            left: 13px;
            .video-two {
              position: relative;
              float: left;
              margin-right: 10px;
              color: #999999;
            }
            .last {
              position: relative;
              left: 13%;
            }
          }
          .video-desc {
            position: relative;
            font-size: 0;
            width: 95.8%;
            height: 50px;
            overflow: hidden;
            .desc-p {
              position: relative;
              left: 13px;
              display: inline-table;
              text-align: left;
              font-size: 14px;
            }
          }
          .video-icon-list {
            position: relative;
            display: flex;
            width: 100%;
            height: 50px;
            text-align: center;
            border-bottom: 1px solid #E5E5E5;
            .icon-list {
              flex: 1;
              span {
                position: relative;
                top: 5px;
                color: #9F9F9F;
              }
              .icon-list-one {
                font-size: 20px;
                color: #fb7299;
              }
              .icon-list-two {
                font-size: 20px;
                color: #FFA726;
              }
              .icon-list-three {
                font-size: 20px;
                color: #fb7299;
              }
              .icon-list-four {
                font-size: 20px;
                color: #3CA6FF;
              }
              .icon-list-five {
                font-size: 20px;
                color: #47C236;
              }
            }
          }
          .video-reason {
            position: relative;
            top: 15px;
            line-height: 20px;
            .video-img {
              position: relative;
              left: 13px;
              float: left;
              img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
            }
            .video-name {
              position: relative;
              left: 25px;
              top: 5px;
              .video-name-one {
                font-size: 18px;
                color: #000;
                font-weight: 600;
              }
              .video-name-two {
                color: #9B9B9B;
              }
            }
            .video-btn {
              position: relative;
              top: -34px;
              left: 53%;
              .video-btn-one {
                background-color: white;
                border: 1px solid #fb7299;
                color: #fb7299;
              }
              .video-btn-two {
                background-color: #fb7299;
                border: 1px solid #fb7299;
                color: white;
              }
            }
          }
          .video-tag {
            position: relative;
            left: 13px;
            top: 5px;
            .video-tag-name {
              display: inline-block;
              padding: 0 30px;
              border-radius: 25px;
              border: 1px solid #EAEAEA;
              font-weight: 700;
              font-size: 17px;
              color: black;
            }
            .video-tag-icon {
              position: absolute;
              right: 25px;
              top: 10px;
              font-size: 20px;
              color: #CCCCCC;
            }
          }
        }
      }
    }
  }
</style>
