<template>
  <div class="pcnav">
    <div class="act-container">
      <ul>
        <li :class="[navNum==0?'navactive':'']" @click="toTitleNum('/21tssd')">大赛简介</li>
        <li :class="[navNum==1?'navactive':'']" @click="toTitleNum('/news')">新闻快讯</li>
        <!-- <li :class="[navNum==3?'navactive':'']" @click="toTitleNum('/monselect')">入围作品</li>
        <li :class="[navNum==4?'navactive':'']" @click="toTitleNum('/resultview')">结果公示</li> -->
        <li :class="[navNum==2?'navactive':'']" @click="toTitleNum('/picshow')">作品展示</li>
        <li :class="[navNum==3?'navactive':'']" @click="disabledClick('/resultview')">结果公示</li>
         <!-- <li :class="[navNum==4?'navactive':'']" @click="disabledClick('/price')">最佳组织奖</li> -->
      </ul>
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
    return {}
  },
  methods: {
    toTitleNum(path) {
      // debugger
      this.$router.push({ path: path })
    },
    disabledClick() {
      this.$message.info('敬请期待')
    }
  }
}
</script>
