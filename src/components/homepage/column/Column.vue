<template>
  <div class="scroll" ref="column">
    <div class="home-column">
      <div ref="pullDown" style="display: none;" class="pull">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <div class="column-banner">
        <ul class="column-ul" ref="columnUl">
          <li v-for="item in dataCol.banners.concat([dataCol.banners[0]])">
            <a :href="item.url"><img :src=item.image class="banner-img"></a>
          </li>
        </ul>
        <ul class="small-point" ref="point">
          <li v-for="item in dataCol.banners"></li>
        </ul>
      </div>
      <div class="column-categories">
        <ul class="categories-ul">
          <li v-for="item in dataCol.categories">
            <img :src="item.banner_url" width="40" height="40" alt=""><br>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="column-rec">
        <h4>推荐文章</h4>
        <i class="icon-stats-bars2 column-icon">&nbsp;排行榜</i>
      </div>
      <div class="column-articles">
        <ul class="articles-ul">
          <li class="articles-list" v-for="item in dataCol.articles">
            <div class="articles-top">
              <img :src="item.author.face" alt="">
              <span>{{item.author.name}}</span>
            </div>
            <div class="articles-p">
              <p>{{item.title}}</p>
            </div>
            <img :src="item.banner_url" class="articles-img" alt="">
            <div class="column-summary">
              <p class="summary-p">{{item.summary}}</p>
            </div>
            <div class="column-bottom">
              <div class="bottom-category">
                  <span>
                    {{item.category.name}} · {{item.stats.view}}阅读
                  </span>
              </div>
              <div class="bottom-favorite">
                <i class="icon-point-right">&nbsp;{{item.stats.favorite}}</i>
              </div>
              <div class="bottom-reply">
                <i class="icon-bubble2">&nbsp;{{item.stats.reply}}</i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import {mapMutations, mapActions} from 'vuex'
  export default {
    props: {
      dataCol: {
        type: Object
      }
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions(['startColumnTransition', 'linstenTranstionEnd', 'transitionAgain']),
      ...mapMutations(['RECEIVE_LENGTH']),
      callback () {
        this.transitionAgain({obj: this.$refs.columnUl, modules: 'column'})
      },
      iScrollColumn () {
        let pullDown = this.$refs.pullDown
        this.columnScroll = new IScroll(this.$refs.column, {
          click: true,
          probeType: 3
        })
        this.columnScroll.on('scroll', function () {
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
      }
    },
    created () {
      this.$nextTick(() => {
        this.iScrollColumn()
        this.RECEIVE_LENGTH(this.$refs.columnUl.getElementsByTagName('li').length - 1)
        let objPain = this.$refs.point.getElementsByTagName('li')
        let obj = this.$refs.columnUl
        this.startColumnTransition({obj, objPain})
        this.linstenTranstionEnd({obj, callback: this.callback})
      })
    },
    watch: {
      dataCol (val) {
        if (val) {
          this.$nextTick(() => { // 等待整个页面渲染完毕之后再获取ul
            this.RECEIVE_LENGTH(this.$refs.columnUl.getElementsByTagName('li').length - 1)
            let objPain = this.$refs.point.getElementsByTagName('li')
            let obj = this.$refs.columnUl
            this.startColumnTransition({obj, objPain})
            this.linstenTranstionEnd({obj, callback: this.callback})
            this.iScrollColumn()
          })
        }
      }
    }
  }
</script>

<style lang="less">

  .home-column {
    display: inline-block;
    position: relative;
    width: 100%;
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
    .column-banner {
      position: relative;
      width: 95%;
      margin: 10px;
      overflow: hidden;
      .column-ul {
        width: 1000%;
        .banner-img {
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
    .column-categories {
      position: relative;
      top: 15px;
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #E7E7E7;
      .categories-ul {
        position: relative;
        width: 100%;
        text-align: center;
        li {
          float: left;
          margin-left: 30px;
          span {
            position: relative;
            top: 10px;
          }
        }
      }
    }
    .column-rec {
      position: relative;
      top: 20px;
      left: 15px;
      h4 {
        line-height: 30px;
        white-space: nowrap;
        color: black;
        font-weight: 500;
      }
      .column-icon {
        position: relative;
        right: -70%;
        top: -36px;
        color: #fb7299;
        font-size: 18px;
      }
    }
    .column-articles {
      position: relative;
      top: -10px;
      width: 95%;
      margin: 10px;
      .articles-ul {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: #F4F4F4;
        .articles-list {
          width: 100%;
          height: 370px;
          margin-bottom: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 5px 5px 5px #E2E2E2;
          .articles-top {
            position: relative;
            top: 10px;
            left: 20px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            span {
              position: relative;
              top: 5px;
              left: 5px;
            }
          }
          .articles-p {
            position: relative;
            top: 15px;
            width: 94%;
            left: 10px;
            p {
              font-size: 16px;
              font-weight: 700;
              color: black;
            }
          }
          .articles-img {
            position: relative;
            top: 15px;
            width: 100%;
            height: 150px;
          }
          .column-summary {
            position: relative;
            top: 30px;
            margin: 0 auto;
            width: 90%;
            height: 40px;
            overflow: hidden;
            .summary-p {
              line-height: 20px;
              font-weight: 700;
            }
          }
          .column-bottom {
            position: relative;
            top: 40px;
            color: #b3b3b3;
            .bottom-category {
              position: relative;
              left: 20px;
            }
            .bottom-favorite {
              position: relative;
              top: -19px;
              left: 65%;
            }
            .bottom-reply {
              position: relative;
              top: -38px;
              left: 83%;
            }
          }
        }
      }
    }
  }


</style>
