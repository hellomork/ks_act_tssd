<template>
  <div>
    <vue-neditor-wrap v-model="content" :config="config" :destroy="true" @getContentTxt="getContentTxt" @ready="ready" ref="ueditor"></vue-neditor-wrap>
  </div>
</template>
<script>
import VueNeditorWrap from 'vue-neditor-wrap'
// import store from '@/store'
// var projectName = store.state.user.projectName
export default {
  components: {
    VueNeditorWrap
  },
  props: {
    newContent: {
      type: String,
      default: String
    },
    config: {
      type: Object,
      default() {
        return {
          // 如果需要上传功能,找后端小伙伴要服务器接口地址
          // serverUrl: "http://www.jlswhg.com/ueditor/ueditorServer.show",
          // 你的UEditor资源存放的路径,相对于打包后的index.html
          UEDITOR_HOME_URL: process.env.NODE_ENV === 'development' ? '/static/NEditor/' : '/' + '21tssd' + '/static/NEditor/'
        }
      }
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: ''
    }
  },

  methods: {
    ready(data) {
      this.$emit('ready')
      // console.log(this.$refs.ueditor.editor)
      // this.getContent()
      // setTimeout(() => {
      //   console.log(this.$refs.ueditor.editor.getContentLength())
      // }, 3000)
      console.log(data)
      // 禁用编辑器
      // this.$refs.ueditor.editor.setDisabled('fullscreen')
      // 设置全局样式
      // data.dom.domUtils.setStyles(this.$refs.ueditor.editor.body, {
      //   'color': '#333333', 'font-family': "'Microsoft Yahei','Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif", 'font-size': '16px', 'line-height': '1.6'
      // })
    },
    getContent() {
      // this.$emit('getContent', this.content)
      return this.content
    },
    setContent() {
      this.content = this.newContent
      this.getContentTxt()
    },
    getContentTxt() {
      this.$emit('getContentTxt', this.$refs.ueditor.editor.getContentTxt())
    }
  },
  mounted() {
    if (this.flag) {
      setTimeout(() => {
        this.getContentTxt()
      }, 3000)
    }
  }
}
</script>
