<template>
  <div class="mine">
    <div class="home-mine">
      <div class="mine-icon">
        <i class="icon-checkbox-unchecked"></i>
        <i class="icon-qrcode"></i>
        <i class="icon-cog"></i>
      </div>
      <div class="mine-img">
        <div class="mine-one">
          <div class="mine-two">
            <img src="../../common/img/bilibili.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="mine-text">
        <span class="mine-name">BiliBili-name</span><br>
        <span class="mine-in">注册会员</span><br>
        <span class="mine-m">硬币：0 &nbsp; B币：0</span>
        <i class="icon-circle-right icon-mine"></i>
      </div>
      <div class="mine-wold">
        <span class="wold">来吧！只有会员才知道的世界！<i class="icon-circle-right icon-wold"></i></span><br>
      </div>
    </div>
    <div class="mine-list">
      <div class="relevant-li">
        <div class="relevant-mine" ref="relevantSearch">
          <ul class="relevant">
            <li class="relevant-one">
              <div class="one">个人中心</div>
              <ul class="relevant-one-ul">
                <li class="relevant-one-list"><i style="color: #2CBCE7" class="icon-cloud-download mine-size"></i><br>离线缓存
                </li>
                <li class="relevant-one-list"><i style="color: #2CBCE7" class="icon-history mine-size"></i><br>历史记录
                </li>
                <li class="relevant-one-list"><i style="color: #FF5D79" class="icon-star-full mine-size"></i><br>我的收藏
                </li>
                <li class="relevant-one-list"><i style="color: #FF5D79" class="icon-radio-checked mine-size"></i><br>我的关注
                </li>
                <li class="relevant-one-list"><i style="color: #2CBCE7" class="icon-instagram mine-size"></i><br>稍后再看
                </li>
                <li class="relevant-one-list"><i style="color: #FFBF2C" class="icon-credit-card mine-size"></i><br>B币钱包
                </li>
                <li class="relevant-one-list"><i style="color: #FFBF2C" class="icon-google-drive mine-size"></i><br>主题选择
                </li>
              </ul>
            </li>
            <li class="relevant-two">
              <div class="one">我的服务</div>
              <ul class="relevant-one-ul">
                <li class="relevant-one-list"><i style="color: #FFBF2C" class="icon-flag mine-size"></i><br>游戏中心
                </li>
                <li class="relevant-one-list"><i style="color: #FFBF2C" class="icon-tv mine-size"></i><br>直播中心
                </li>
                <li class="relevant-one-list"><i style="color: #FF5D79" class="icon-vimeo2 mine-size"></i><br>大会员
                </li>
                <li class="relevant-one-list"><i style="color: #2CBCE7" class="icon-floppy-disk mine-size"></i><br>看视频免流量
                </li>
                <li class="relevant-one-list"><i style="color: #FFBF2C" class="icon-file-text2 mine-size"></i><br>会员购订单
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  export default {
    data () {
      return {}
    },
    methods: {
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
    }
  }
</script>

<style lang="less">
  .mine {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fb7299;
    .home-mine {
      width: 100%;
      height: 200px;
      background-color: #fb7299;
      .mine-icon {
        position: absolute;
        right: 0;
        text-align: center;
        flex: 50px 0 0;
        font-size: 18px;
        line-height: 50px;
        color: #FFFFFF;
        i {
          margin-right: 15px;
        }
      }
      .mine-img {
        position: relative;
        top: 40px;
        left: 20px;
        .mine-one {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #FB80A3;
          .mine-two {
            position: relative;
            left: 10px;
            top: 10px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #FC9AB6;
            img {
              position: relative;
              left: 7.25px;
              top: 7.25px;
              width: 65px;
              height: 65px;
              border-radius: 50%;
              background-color: #FB80A3;
            }
          }
        }
      }
      .mine-text {
        position: relative;
        left: 140px;
        top: -45px;
        line-height: 25px;
        .mine-name {
          font-size: 20px;
          font-weight: 500;
          color: white;
        }
        .mine-in {
          font-size: 14px;
          color: #FDC7D6;
          border-radius: 5px;
          padding: 1px 4px;
          border: 2px solid #FFFFFF;
        }
        .mine-m {
          font-size: 14px;
          color: #FDC7D6;
        }
        .icon-mine {
          position: absolute;
          top: 28px;
          left: 200px;
          font-size: 20px;
          color: white;
        }
      }
      .mine-wold {
        position: relative;
        left: 20px;
        top: -25px;
        .wold {
          display: inline-block;
          padding-left: 10px;
          width: 92%;
          height: 40px;
          font-size: 16px;
          color: white;
          line-height: 42px;
          border-radius: 8px;
          background-color: #D36080;
          .icon-wold {
            position: absolute;
            line-height: 39px;
            font-size: 20px;
            right: 35px;
          }
        }
      }
    }
    .mine-list {
      .relevant-li {
        position: relative;
        display: inline-block;
        top: 10px;
        width: 100%;
        .relevant-mine {
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
            height: 130%;
            background-color: #F4F4F4;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            .relevant-one {
              position: relative;
              width: 100%;
              height: 240px;
              background-color: white;
              border-bottom: 1px solid #FBFBFB;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              .one {
                position: relative;
                width: 100%;
                height: 50px;
                padding-left: 5%;
                line-height: 50px;
                color: black;
              }
              .relevant-one-ul {
                display: inline-block;
                width: 100%;
                height: 200px;
                .relevant-one-list {
                  display: inline-block;
                  width: 93.7px;
                  height: 95px;
                  float: left;
                  text-align: center;
                  border-right: 1px solid #E7E7E7;
                  border-top: 1px solid #E7E7E7;
                  .mine-size {
                    display: inline-block;
                    margin-top: 20px;
                    margin-bottom: 15px;
                    font-size: 28px;
                  }
                }
              }
            }
            .relevant-two {
              position: relative;
              top: 10px;
              width: 100%;
              height: 240px;
              background-color: white;
              border-bottom: 1px solid #FBFBFB;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              .one {
                position: relative;
                width: 100%;
                height: 50px;
                padding-left: 5%;
                line-height: 50px;
                color: black;
              }
              .relevant-one-ul {
                display: inline-block;
                width: 100%;
                height: 200px;
                .relevant-one-list {
                  display: inline-block;
                  width: 93.7px;
                  height: 95px;
                  float: left;
                  text-align: center;
                  border-right: 1px solid #E7E7E7;
                  border-top: 1px solid #E7E7E7;
                  .mine-size {
                    display: inline-block;
                    margin-top: 20px;
                    margin-bottom: 15px;
                    font-size: 28px;
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
