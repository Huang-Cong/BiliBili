<template>
  <div>
    <div class="home">
      <div class="home-page">
        <div class="home-list">
          <i>分区</i>
        </div>
        <div class="icon-2">
          <router-link to="/searchPart">
            <i class="icon-search icon-2"></i>
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <div class="scroll-nav" ref="nav">
      <div class="nav">
        <div class="nav-container">
          <ul class="nav-ul">
            <li class="nav-list" v-for="item in dataNav">
              <img :src="item.logo" alt="" width="50" height="50"><br>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="nav-data">
          <div class="nav-navigation">
            <ul>
              <li v-for="item in dataNavData">
                <div class="nav-title">
                  <div class="nav-left">
                    <img :src="item.logo" alt="" width="26" height="26">
                    <span>{{item.title}}</span>
                  </div>
                  <span class="nav-right">更多{{(item.title).substr(0, 2)}}&nbsp;<i class="icon-circle-right"></i></span>
                </div>
                <div v-for="item in item.banner">
                  <a :href="item[0].uri"><img class="img" :src="item[0].image" height="115" width="93%"></a>
                </div>
                <div class="nav-content">
                  <ul>
                    <li class="nav-content-list" v-for="item in item.body">
                      <div class="content-nav">
                        <div class="nav-top">
                          <img :src="item.cover">
                          <div class="nav-num">
                            <div class="num-one"><i class="icon-play"></i>
                              <span class="item-play">{{lookPlay(item.play)}}</span>
                            </div>
                            <div class="num-two" v-if="item.favourite"><i class="icon-heart"></i>
                              <span class="item-fav">{{lookPlay(item.favourite)}}</span></div>
                          </div>
                        </div>
                        <div class="nav-bottom">
                          <p>{{item.title}}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  export default {
    props: {
      dataNav: {
        type: Array
      },
      dataNavData: {
        type: Array
      }
    },
    data () {
      return {}
    },
    methods: {
      iScrollNav () {
        this.navScroll = new IScroll(this.$refs.nav, {
          click: true,
          probeType: 3
        })
      },
      lookPlay (current) {
        return current > 10000 ? (current / 10000).toFixed(1) + '万' : current
      }
    },
    created () {
      this.$nextTick(() => {
        this.iScrollNav()
      })
    },
    watch: {
      dataNav (val) {
        if (val) {
          this.$nextTick(() => {
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .scroll-nav {
    width: 100%;
    height: 590px;
    /*background-color: #F4F4F4;*/
    .nav {
      position: relative;
      top: 50px;
      .nav-container {
        position: relative;
        .nav-ul {
          display: inline-block;
          width: 100%;
          height: 100%;
          .nav-list {
            float: left;
            width: 80px;
            text-align: center;
            margin-left: 12px;
            margin-bottom: 15px;
            img {
              border-radius: 8px;
            }
            span {
              position: relative;
              top: 5px;
              color: #757575
            }
          }
        }
      }
      .nav-data {
        position: relative;
        .nav-navigation {
          position: relative;
          top: -10px;
          .nav-title {
            margin-top: 20px;
            .nav-left {
              position: relative;
              left: 10px;
            }
            .nav-right {
              position: absolute;
              right: 20px;
              margin-top: -24px;
              color: #757575
            }
          }
          .img {
            margin-top: 10px;
            margin-left: 12px;
            border-radius: 8px;
          }
          .nav-content {
            position: relative;
            width: 95%;
            left: 14px;
            ul {
              position: relative;
              display: inline-block;
              width: 100%;
              height: 100%;
              .nav-content-list {
                position: relative;
                width: 50%;
                float: left;
                margin-bottom: 10px;
                top: 15px;
                .content-nav {
                  width: 10%;
                  .nav-top {
                    position: relative;
                    width: 100%;
                    img {
                      border-top-left-radius: 8px;
                      border-top-right-radius: 8px;
                      width: 950%;
                      height: 115px;
                    }
                    .nav-num {
                      position: absolute;
                      display: inline-block;
                      width: 500%;
                      top: 90px;
                      left: 10px;
                      color: white;
                      font-size: 12px;
                      .num-one {
                        position: relative;
                        width: 100%;
                        .item-play {
                          position: relative;
                          left: 3px;
                          top: -1px;
                        }
                      }
                      .num-two {
                        position: relative;
                        top: -18px;
                        left: 70px;
                        .item-fav {
                          position: relative;
                          left: 3px;
                        }
                      }
                    }
                  }
                  .nav-bottom {
                    position: relative;
                    font-size: 0;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    p {
                      position: relative;
                      width: 950%;
                      height: 50px;
                      padding: 10px;
                      font-size: 16px;
                      text-align: left;
                      overflow: hidden;
                      text-overflow: ellipsis
                    }
                  }
                }
              }
            }
          }
        }

      }
    }
  }
</style>
