<template>
  <transition :name="transitionName">
    <div class="search child-view-search">
      <div @click="goBack" class="return"><i class="icon-circle-left"></i></div>
      <div class="search-input">
        <font class="inputting">
          <span class="icon-search"></span>
          <input type="search" placeholder="海底深处究竟有何方妖孽?">
        </font>
      </div>
      <div class="top-search">
        <span class="everybody">大家都在搜</span>
        <div class="top-search-list" ref="topSearch">
          <ul class="ul-top">
            <li class="top-list" v-for="item in dataTop.list">
              <span class="top-content">
                {{item.keyword}}
              </span>
            </li>
          </ul>
        </div>
        <div class="check-more">
          <span class="check-left"></span>
          <span class="check-out-more" @click="checkMore">
            <i class="icon-circle-down search-down" ref="icon">&nbsp;查看更多</i>
          </span>
          <span class="check-right"></span>
        </div>
      </div>
      <div class="relevant-li">
        <div class="relevant-search" ref="relevantSearch">
          <ul class="relevant">
            <li class="relevant-one">
              <div class="one">话题中心<i class="arrow icon-circle-right"></i></div>
              <div class="one">活动中心<i class="arrow icon-circle-right"></i></div>
              <div class="one">小黑屋<i class="arrow icon-circle-right"></i></div>
            </li>
            <li class="relevant-two">
              <div class="two">原创排行榜<i class="arrow icon-circle-right"></i></div>
              <div class="two">全区排行榜<i class="arrow icon-circle-right"></i></div>
            </li>
            <li class="relevant-three">
              <div class="two">原创排行榜<i class="arrow icon-circle-right"></i></div>
              <div class="two">全区排行榜<i class="arrow icon-circle-right"></i></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  export default {
    data () {
      return {
        transitionName: 'slide-left',
        dataTop: {},
        topScroll: false
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
    methods: {
      goBack () {
        this.$router.goBack()
      },
      checkMore () {
        let topSearch = this.$refs.topSearch
        let icon = this.$refs.icon
        this.topScroll = !this.topScroll
        if (this.topScroll === true) {
          topSearch.style.height = '250px'
          icon.className = 'icon-circle-up search-down'
          icon.innerHTML = '&nbsp;收起'
          this.topSearchScroll = new IScroll(topSearch, {
            click: true,
            probeType: 3
          })
        } else if (this.topScroll === false) {
          topSearch.style.height = '115px'
          icon.className = 'icon-circle-down search-down'
          icon.innerHTML = '&nbsp;查看更多'
          this.topSearchScroll = new IScroll(topSearch, {
            click: true,
            probeType: 3
          })
          this.topSearchScroll.destroy()
        }
      },
      relevantScroll () {
        this.relevantSearch = new IScroll(this.$refs.relevantSearch, {
          click: true,
          probeType: 3
        })
      }
    },
    created () {
      this.$nextTick(() => {
        this.relevantScroll()
      })
      let self = this
      this.$axios.get('/api/dataTop')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.dataTop = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
</script>

<style lang="less">
  .child-view-search {
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

  .search {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fb7299;
    z-index: 50;
    .return {
      position: relative;
      top: 2px;
      font-size: 20px;
      margin: 8px 0 0 12px;
      color: white;
    }
    .search-input {
      position: relative;
      width: 85%;
      height: 30px;
      border-radius: 8px;
      line-height: 30px;
      left: 40px;
      top: -38px;
      background-color: white;
      .inputting {
        position: relative;
        width: 100%;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 10px;
        .icon-search {
          position: relative;
          font-size: 10px;
          color: black;
        }
        input {
          position: absolute;
          width: 1300%;
          padding: 0 10px 0 5px;
          border-radius: 8px;
          border: none;
          font-size: 12px;
          z-index: 3;
          color: white;
          letter-spacing: 1px;
          background-color: white;
        }
      }
    }
    .top-search {
      position: relative;
      top: -38px;
      .everybody {
        position: relative;
        width: 100%;
        left: 13px;
        color: white;
        letter-spacing: 2px;
        font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
      }
      .top-search-list {
        position: relative;
        top: -8px;
        width: 100%;
        height: 115px;
        overflow: hidden;
        .ul-top {
          position: relative;
          width: 100%;
          height: 180%;
          display: inline-block;
          .top-list {
            position: relative;
            float: left;
            margin: 10px 0 0 8px;
            .top-content {
              position: relative;
              display: inline-block;
              width: 100%;
              height: 100%;
              background-color: #FB8EAD;
              color: white;
              border-radius: 8px;
              padding: 0 8px 0 8px;
              letter-spacing: 1px;
            }
          }
        }
      }
      .check-more {
        position: relative;
        display: flex;
        width: 95%;
        left: 10px;
        top: -10px;
        .check-left, .check-right {
          position: relative;
          display: inline-block;
          top: 22px;
          flex: 1;
          width: 50%;
          height: 1px;
          border: 0.5px solid white;
        }
        .check-out-more {
          position: relative;
          display: inline-block;
          flex: 1;
          text-align: center;
          color: white;
          width: 100%;
          height: 100%;
          .search-down {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 45px;
            vertical-align: text-bottom;
          }
        }
      }
    }
    .relevant-li {
      position: relative;
      display: inline-block;
      top: -45px;
      width: 100%;
      .relevant-search {
        position: relative;
        width: 100%;
        height: 500px;
        background-color: #fb7299;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
        .relevant {
          position: relative;
          width: 100%;
          height: 110%;
          background-color: #F4F4F4;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          .relevant-one {
            position: relative;
            width: 100%;
            height: 150px;
            background-color: white;
            border-bottom: 1px solid #E7E7E7;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            .one {
              position: relative;
              width: 95%;
              height: 50px;
              left: 5%;
              line-height: 50px;
              border-bottom: 1px solid #E7E7E7;
              .arrow {
                position: absolute;
                left: 90%;
                font-size: 18px;
                line-height: 50px;
              }
            }
          }
          .relevant-two, .relevant-three {
            position: relative;
            top: 10px;
            width: 100%;
            height: 100px;
            background-color: white;
            border-bottom: 1px solid #E7E7E7;
            .two {
              position: relative;
              width: 95%;
              height: 50px;
              left: 5%;
              line-height: 50px;
              border-bottom: 1px solid #E7E7E7;
              .arrow {
                position: absolute;
                left: 90%;
                font-size: 18px;
                line-height: 50px;
              }
            }
          }
          .relevant-three {
            position: relative;
            top: 20px;
          }
        }
      }
    }
  }
</style>
