<template>
  <div id="app">
    <div class="navigation">
      <div class="navigation-li border">
        <div class="tab-item">
          <router-link to="/homepage">
            <i class="icon-home2 icon"><br>
              <i>首页</i>
            </i>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/partition">
            <i class="icon-fire icon"><br>
              <i>分区</i>
            </i>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/dynamics">
            <i class="icon-star-empty icon"><br>
              <i>动态</i>
            </i>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/news">
            <i class="icon-bubble2 icon "><br>
              <i>消息</i>
            </i>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/mine">
            <i class="icon-github icon"><br>
              <i>我的</i>
            </i>
          </router-link>
        </div>
      </div>
    </div>
    <router-view
      :recommend="recommend"
      :bannerItem="bannerItem"
      :dataLive="dataLive"
      :dataNav="dataNav"
      :dataNavData="dataNavData"
      :dataCol="dataCol"
    ></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        recommend: [],
        bannerItem: [],
        dataLive: {},
        dataCol: {},
        dataNav: [],
        dataNavData: []
      }
    },
    created () {
      let self = this
      this.$axios.get('/api/recommend')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.recommend = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/bannerItem')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.bannerItem = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/dataLive')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.dataLive = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/dataNav')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.dataNav = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/dataNavData')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.dataNavData = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/dataCol')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.dataCol = response.data
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
</script>

<style lang="less">
  @import "common/less/mixin";

  .navigation {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 50px;
    z-index: 50;
    background-color: #fff;
    .navigation-li {
      display: flex;
      width: 100%;
      height: 50px;
      .border-1px(rgba(7, 17, 27, 0.1));
    }
    .tab-item {
      flex: 1;
      text-align: center;
      .icon {
        font-size: 25px;
        i {
          position: relative;
          top: -35px;
          font-size: 14px;
        }
      }
      & > a {
        display: inline-block;
        color: #929292;
        text-decoration: none;
        font-size: 14px;
        &.active {
          color: #fb7299;
        }
      }
    }
  }
</style>
