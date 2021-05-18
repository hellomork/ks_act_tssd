<template>
  <div class="wx_nav">
    <div class="navlist">
      <swiper :options="swiperOption1" ref="mySwiper">
        <swiper-slide>
          <div class="wx-nav" :class="[navNum==0?'navactive':'']" @click="toTitleNum('/21tssd')">大赛简介</div>
        </swiper-slide>
        <swiper-slide>
          <div class="wx-nav" :class="[navNum==1?'navactive':'']" @click="toTitleNum('/news')">新闻快讯</div>
        </swiper-slide>
        <swiper-slide>
          <div class="wx-nav" :class="[navNum==2?'navactive':'']" @click="toTitleNum('/picshow')">作品展示</div>
        </swiper-slide>
        <swiper-slide>
          <div class="wx-nav" :class="[navNum==3?'navactive':'']" @click="toTitleNum('/resultview')">结果公示</div>
        </swiper-slide>
        <!-- <swiper-slide>
          <div class="wx-nav" :class="[navNum==4?'navactive':'']" @click="disabledClick('/price')">最佳组织奖</div>
        </swiper-slide> -->
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    navNum: {
      type: Number
    }
  },
  data() {
    return {
      swiperOption1: {
        slidesPerView: 3.75
      }
    }
  },
  methods: {
    toTitleNum(path) {
      // debugger
      this.$router.push({ path: path })
    },
    disabledClick() {
      this.$toast.fail('敬请期待')
    }
  }
}
</script>
