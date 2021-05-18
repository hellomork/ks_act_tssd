<template>
  <div class="whole">
    <el-container style="height: 100%;;min-height:900px;">
      <el-aside width="200px" style="background-color: #545c64">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" class="normal" @click="toPath('video_list')">
            <i class="el-icon-menu"></i>
            <span slot="title">图片管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <div class="main">
            <div class="top-chooce">
              <div class="choose-bar clearfix">
                <el-form
                  label-width="80px"
                  :model="checkdetail"
                  label-position="right"
                >
                  <el-form-item label="姓名">
                    <el-input v-model="checkdetail.ocWrite"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input v-model="checkdetail.mobile"></el-input>
                  </el-form-item>
                  <div class="article">
                    <el-form-item label="作品名称">
                      <el-input v-model="checkdetail.ocName"></el-input>
                    </el-form-item>
                  </div>
                  <div class="article_detail">
                    <el-form-item label="作品介绍">
                      <el-input
                        v-model="checkdetail.ocComposingWords"
                        maxlength="200"
                        type="textarea"
                        :rows="5"
                        cols="50"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <template v-if="flag">
                    <div class="pic_prev">
                        <h5>图片预览</h5>
                        <div class="pic_preview">
                        <el-carousel indicator-position="outside" :autoplay="false" :initial-index="0">
                          <el-carousel-item v-for="(item,index) in checkdetail.ocCover" :key="index">
                            <div class="preview" :style="{backgroundImage: 'url('+ item +')'}"> </div>
                          </el-carousel-item>
                      </el-carousel>
                      </div>
                    </div>
                  </template>
                <template>
                  <el-form-item label="作品上传">
                    <div class="uploadpic">
                      <div style="margin-top:20px;width: 928px;">
                        <upload
                          @file="getimglist"
                          @uploadSuccess="uploadSuccess"
                          :fileType="1"
                          :limit="10"
                          :multiple="true"
                          accept=".jpg, .png"
                          ref="mychild"
                        ></upload>
                      </div>
                    </div>
                  </el-form-item>
                </template>
                  <el-form-item>
                    <el-button type="danger" @click="cancle">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import upload from '@/components/Upload'
export default {
  components: {
    upload
  },
  data() {
    return {
      id: this.$route.params.id,
      operateCode: 'ee0763cb-7cbf-11eb-8578-7cd30ae45c70-1',
      checkdetail: {},
      n: 0,
      flag: true,
      imglist: [],
      coverStr: ''
    }
  },
  methods: {
    uploadSuccess(url) {
      console.log('图片', url)
      this.n++
      if (this.n === this.imglist.length) {
        if (url) {
          this.checkdetail.ocCover += url
        }
      } else {
        this.checkdetail.ocCover += url + ','
      }
      this.confirm()
      // }
    },
    getimglist(file) {
      this.imglist.push(file)
      console.log(this.imglist)
    },
    getDetail() {
      const params = {}
      const _this = this
      params.id = this.id
      params.operateCode = this.operateCode
      this.$apis.getBackDetail(params).then(res => {
        // console.log(res)
        _this.checkdetail = res.data.data.list[0]
        this.checkdetail.ocCover = _this.checkdetail.ocCover.split(',')
        console.log(_this.checkdetail.ocCover)
        // _this.share(_this.detail)
      })
    },
    toPath(path) {
      this.$router.push({ path: '/' + path })
    },
    confirm() {
      const _this = this
      const params = _this.checkdetail
      _this.coverStr = ''
      for (var i = 0; i < params.ocCover.length; i++) {
        if (i === 0) {
          _this.coverStr += params.ocCover[i]
        } else {
          _this.coverStr = _this.coverStr + ',' + params.ocCover[i]
        }
      }
      params.ocCover = _this.coverStr
      this.$apis.backUpdate(params).then(res => {
        if (res.data.status.returnCode === 100) {
          _this.$message.success('修改成功')
          _this.$router.push({ path: '/pics_list' })
        } else {
          _this.$message.error('修改失败')
          return false
        }
      })
    },
    cancle() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}
.active {
  i {
    color: #409eff;
  }
  span {
    color: #409eff;
  }
}
.normal {
  i {
    color: #fff;
  }
  span {
    color: #fff;
  }
}
.main {
  margin: 0px 40px;
  .top-chooce {
    width: 100%;
    margin: 40px 0px;
    .choose-bar {
      ul {
        float: left;
        list-style: none;
        li {
          float: left;
          padding-right: 8px;
          padding-top: 12px;
          .el-select {
            width: 150px;
          }
        }
      }
      .action-bar {
        float: right;
        padding-top: 12px;
      }
    }
  }
}
.whole {
  background-color: white;
}
.video{
    margin-left: 20px;
    span{
        font-size: 14px;
        float: left;
    }
    video{
        float: left;
        margin-left: 30px;
        background-color: #eeeeee;
    }
}
.pic_prev{
  overflow: hidden;
  h5{
    float: left;
    font-size: 14px;
    margin-left: 10px;
    color: #606266;
    font-weight: normal;
  }
  .pic_preview{
    float: left;
    margin-left: 15px;
    border: 1px solid #DCDFE6;
    width: 500px;
    height: 300px;
}
}

</style>
