<template>
  <div class="wxheadbg">
    <div class="wx_header">
      <!-- <div class="readCount">
        <span>总浏览量：{{item.visitNum}}</span>
      </div> -->
      <div class="submit" @click="toPublish">
        <div class="submit_i">
          <span>我要投稿</span>
          <img src="@/assets/imgwx/hzact/ic_tou.png" alt="">
          <!-- <img src="@/assets/imgwx/hzmovie/ic_morewx.png" alt /> -->
        </div>
      </div>
    </div>
    <!-- 分享 返回顶部 -->
    <!-- 悬浮按钮 -->
    <div class="top-share">
      <div class="listleft" @click="shareAlert()">
        <img src="@/assets/imgwx/wx_share.png" alt />
      </div>
      <div class="listtwo" @click="toTo()">
        <img src="@/assets/imgwx/backtop.png" alt />
        <!-- <span>返回<br>顶部</span> -->
      </div>
    </div>
    <!--微信分享指示-->
    <div class="hom-sharewraper" id="hom-sharewraper" style="display:none" @click="closedAlert();">
      <img src="@/assets/imgwx/share-alert.png" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // item: {
      //   visitNum: 0,
      //   voteNum: 0
      // }
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'userInfo', 'publishStatus', 'timeDiff'])
  },
  methods: {
    toTo() {
      window.scrollTo(0, 0)
    },
    shareAlert() {
      document.getElementById('hom-sharewraper').style.display = 'block'
    },
    closedAlert() {
      document.getElementById('hom-sharewraper').style.display = 'none'
    },
    toPublish() {
      // console.log(this.userInfo)
      //  console.log(item)
      var nowTime = this.timeDiff
      var endTime = new Date('2021/06/15 23:59:59').getTime()
      console.log('nowTime', nowTime)
      console.log('endTime', endTime)
      if (nowTime > endTime) {
        this.$toast('投稿已结束')
        return
      }
      this.$router.push({
        path: '/worksubmit'
      })

      // this.$toast('投稿未开始')
    }
    // getTotalNum() {
    //   var parm = {}
    //   parm.operateCode =
    //     'ee0763cb-7cbf-11eb-8578-7cd30ae45c70-1'
    //   parm.ocName = '“童声诵党”庆祝建党100周年昆山省少儿朗诵大赛'
    //   var _this = this
    //   this.$apis.getTotalNum(parm).then(res => {
    //     console.log(res)
    //     if (res.data.status.returnCode === 100) {
    //       _this.item = res.data.data.list[0]
    //     }
    //   })
    // }
  },

  created() {
    // this.getTotalNum()
  }
}
</script>
<style lang="scss" scoped>
.top-share {
  position: fixed;
  right: 0;
  top: 5.6rem;
  z-index: 99;
  /* z-index: 999;s */
  .listleft {
    width: 1rem;
    height: 1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .listtwo {
    margin-top: 0.5rem;
    width: 1rem;
    height: 1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.hom-sharewraper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  padding-top: 0.6rem;
  padding-left: 2.3rem;
}
.hom-sharewraper img {
  display: block;
  width: 4.77rem;
  height: 3.68rem;
}
</style>
