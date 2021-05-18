<template>
  <div class="whole">
    <!-- pc -->
    <div class="mediareport" v-if="!isMobile">
      <headbg></headbg>
      <pcnav :navNum="navNum"></pcnav>
       <!-- <div class="classify_change ">
        <ul class="clearfix act-container">
          <li :class="classify==1?'classifyActive':''" @click="classifyChange(1)">书法</li>
          <li :class="classify==2?'classifyActive':''" @click="classifyChange(2)">绘画</li>
          <li :class="classify==3?'classifyActive':''" @click="classifyChange(3)">摄影</li>
        </ul>
      </div> -->
         <div class="contain">
      <!-- <div class="contain contain_picshow"> -->
        <div class="act-container">
          <div class="special">
            <div class="pic">
              <img src="@/assets/img/hzact/title_month.png" alt />
            </div>
            <div class="pictop">
              <!-- <div class="sort">
                <ul>
                  <li>月份：</li>
                  <li :class="teamCode=='5月'?'sortactive':''" @click="changTab('5月')">5月</li>
                  <li :class="teamCode=='4月'?'sortactive':''" @click="changTab('4月')">4月</li>
                  <li :class="teamCode=='3月'?'sortactive':''" @click="changTab('3月')">3月</li>
                </ul>
              </div> -->
              <div class="search">
                <input type="text" placeholder="请输入关键字" v-model="ocName" />
                <button type="button" @click="search">搜索</button>
              </div>
            </div>
            <div class="new_piclist">
              <ul>
                <li v-for="(item,index) in list" :key="index" @click="toDetail(item,index+1)">
                  <div class="cover">
                    <img :src="item.ocCover" alt />
                  </div>
                  <div class="title">
                    <h3>{{item.ocName|substr(14)}}</h3>
                    <span style="display:inline-block">编号 #{{item.ocNumber}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      style="display:inline-block"
                    >票数 {{item.ocVote}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 分页 -->
            <div class="pages" style="padding-top:51px;">
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="currentPage"
                :limit.sync="pageSize"
                @pagination="changePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- wx -->
    <div class="wx_mediareport" v-if="isMobile">
      <wxheadbg></wxheadbg>
      <wxnav :navNum="navNum"></wxnav>
       <!-- <div class="classify_change ">
        <ul class="clearfix">
          <li :class="classify==1?'classifyActive':''" @click="classifyChange(1)">书法</li>
          <li :class="classify==2?'classifyActive':''" @click="classifyChange(2)">绘画</li>
          <li :class="classify==3?'classifyActive':''" @click="classifyChange(3)">摄影</li>
        </ul>
      </div> -->
      <div class="listshow">
        <div class="listtop">
          <div class="search">
            <input type="text" placeholder="请输入关键字" v-model="ocName" @change="search()" />
            <!-- <button @click="search">搜索</button> -->
          </div>
          <!-- <div class="sort">
            <ul class="clearfix">
              <li>月份：</li>
              <li :class="teamCode=='5月'?'sortactive':''" @click="changTab('5月')">5月</li>
              <li :class="teamCode=='4月'?'sortactive':''" @click="changTab('4月')">4月</li>
              <li :class="teamCode=='3月'?'sortactive':''" @click="changTab('3月')">3月</li>
            </ul>
          </div> -->
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getSongList">
          <div class="list1pic">
            <ul class="clearfix">
              <li
                class="coverlist"
                v-for="(item,index) in list"
                :key="index"
                @click="toDetail(item,index+1)"
              >
                <div class="cover">
                  <img :src="item.ocCover" alt />
                </div>
                <div class="title">
                  <h3>{{item.ocName|substr(10)}}</h3>
                  <span>编号：#{{item.ocNumber}}</span>
                  <span>票数：{{item.ocVote}}</span>
                </div>
                <!-- 排名 -->
              </li>
            </ul>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import headbg from './components/pcheader'
import pcnav from './components/pcnav'
import wxheadbg from './components/wxheadbg'
import Pagination from '@/components/Pagination'
import wxnav from './components/wxnav'
import wxService from '@/api/wxService'
// var imgURrl = require('@/assets/img/shareicon.png')
export default {
  name: 'Monselect',
  components: {
    headbg,
    pcnav,
    wxheadbg,
    wxnav,
    Pagination
  },
  computed: {
    ...mapGetters(['isMobile', 'publishStatus'])
  },
  data() {
    return {
      operateCode: 'ee0763cb-7cbf-11eb-8578-7cd30ae45c70-1',
      navNum: 3,
      // teamCode: '3月',
      classify: 1,
      ocName: '',
      sortNum: 2,
      currentPage: 1,
      pageSize: 12,
      total: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    toDetail(item, index) {
      var pageNum = (this.currentPage - 1) * this.pageSize + index
      if (this.isMobile) {
        pageNum = index
      }
      this.$router.push({
        name: 'pic_detail',
        params: {
          index: pageNum,
          ocName: this.ocName === '' ? 'null' : this.ocName,
          searchSort: this.sortNum,
          teamCode: this.teamCode
        }
      })
    },
    changTab(teamCode) {
      this.teamCode = teamCode
      this.search()
    },
    search() {
      this.currentPage = 1
      this.list = []
      this.getSongList()
    },

    changePage(val) {
      console.log(val)
      this.list = []
      this.getSongList()
    },

    getSongList() {
      const _this = this
      const params = {}
      params.pageNum = this.currentPage
      params.pageSize = this.pageSize
      params.ocName = this.ocName
      params.operateCode = this.operateCode
      // params.teamCode = this.teamCode
      params.firstExpertVote = 3
      params.status = 2
      params.searchSort = this.sortNum
      if (this.isMobile) {
        this.loading = true
      }
      this.$apis.getList(params).then(res => {
        console.log(res)
        if (this.isMobile) {
          // 加载状态结束
          _this.loading = false
          _this.currentPage++
          if (_this.list.length === 0) {
            _this.list = res.data.data.list
          } else {
            _this.list = _this.list.concat(res.data.data.list)
          }

          // 数据全部加载完成
          if (res.data.data.page.curPage === res.data.data.page.totalPage) {
            _this.finished = true
          }
          for (var i = 0; i < _this.list.length; i++) {
            _this.list[i].ocCover = _this.list[i].ocCover.split(',')[0]
          }
        } else {
          _this.list = res.data.data.list
          _this.total = res.data.data.page.totalRow
          for (var j = 0; j < _this.list.length; j++) {
            _this.list[j].ocCover = _this.list[j].ocCover.split(',')[0]
          }
        }
      })
    }
  },
  mounted() {
    this.getSongList()
    if (this.isMobile) {
      var shareConfig = {}
      shareConfig.currentTitle = '“童声诵党”庆祝建党100周年昆山省少儿朗诵大赛'
      shareConfig.share_url = window.location.href
      shareConfig.currentCover = 'https://hzszwhg.oss-cn-beijing.aliyuncs.com/cloud/www.zjhzart.cn/2021/03/1615172625060_123.png'
      shareConfig.currentDetail = '“童声诵党”庆祝建党100周年昆山省少儿朗诵大赛'
      // console.log('分享参数：', shareConfig)
      wxService.setWXConfig(shareConfig)
    }
  }
}
</script>
