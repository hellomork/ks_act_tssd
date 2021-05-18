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
          <el-menu-item index="1" class="active" @click="toPath('video_list')">
            <i class="el-icon-menu"></i>
            <span slot="title">小歌手管理</span>
          </el-menu-item>
          <el-menu-item index="2" class="normal" @click="toPath('words_list')">
            <i class="el-icon-menu"></i>
            <span slot="title">童歌童谣管理</span>
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
                    <el-input v-model="checkdetail.ocWrite" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-input v-model="checkdetail.cardId" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="学校">
                    <el-input v-model="checkdetail.school" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input v-model="checkdetail.mobile" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="checkdetail.email" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="组织单位">
                    <el-input v-model="checkdetail.company" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="指导老师">
                    <el-input v-model="checkdetail.tech" disabled ></el-input>
                  </el-form-item>
                  <el-form-item label="自荐简历">
                    <el-input
                      maxlength="200"
                      type="textarea"
                      :rows="5"
                      cols="50"
                      v-model="checkdetail.resume"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div class="video">
                    <span>视频</span>
                    <video style="width:500px;height:400px" src=""></video>
                </div>

              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      operateCode: 'ead607ff-9e57-11ea-ba14-9c5c8e7be297',
      checkdetail: ''
    }
  },
  methods: {
    getDetail() {
      const params = {}
      const _this = this
      params.id = this.id
      params.operateCode = this.operateCode
      this.$apis.getBackDetail(params).then(res => {
        // console.log(res)
        _this.checkdetail = res.data.data.list[0]
        console.log(_this.detail)
        // _this.share(_this.detail)
      })
    },
    toPath(path) {
      this.$router.push({ path: '/' + path })
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
</style>
