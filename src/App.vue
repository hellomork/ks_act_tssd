<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
   <keep-alive :include="arr">
     <router-view/>
   </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      arr: ['Picshow', 'Monselect']
    }
  },
  // 缓存列表页记录当前滑动位置
  watch: {
    // 监听router
    $route: function(to, from) {
      // console.log('from',from)
      // console.log('to',to)
      if (from.meta.keepAlive) {
        this.arr.includes(from.name) || this.arr.push(from.name)
      } else {
        var name = from.name
        if (this.arr.includes(name)) {
          var index = this.arr.findIndex(function(item) {
            console.log('1111', item)
            return item === name
          })
          this.arr.splice(index, 1)
        }
      }
      if (to) {
        switch (to.name) {
          // 需要缓存的页面
          case 'picshow':
          case 'monselect':
            this.arr.includes(to.name) || this.arr.push(to.name)
            break
          default: break
        }
      }
      // console.log(`从${from.name}去${to.name},缓存页面有： ${this.arr}`)
    }
  }
  // created() {
  //   var nowTime = new Date().getTime()
  //   var publishOver = new Date('2020/07/31 23:59:00')
  //   if (nowTime > publishOver) {
  //     this.$store.commit('SET_PUBLISHOVER', 1)
  //   }
  // }
}
</script>

