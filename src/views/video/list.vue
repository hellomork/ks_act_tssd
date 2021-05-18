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
                <ul>
                  <!-- <li>
                    <span>分组:</span>
                    <el-select v-model="listQuery.teamCode" placeholder="请选择状态" @change="getList()">
                      <el-option value label="全部"></el-option>
                      <el-option value="成人" label="成人"></el-option>
                      <el-option value="少儿" label="少儿"></el-option>
                    </el-select>
                  </li> -->
                  <li>
                    <el-input v-model="listQuery.ocName" placeholder="输入标题关键字">
                      <el-button
                        slot="append"
                        @click="getList()"
                        style="background-color: #409EFF;color:#ffff;font-size: 14px;"
                        icon="el-icon-search"
                      ></el-button>
                    </el-input>
                  </li>
                </ul>
              </div>
            </div>

            <!-- <el-table ref="Tablelist" :data="datalist.list" border stripe>
              <el-table-column align="center" label="标题" min-width="350px">
                <template slot-scope="scope">{{ scope.row.title}}</template>
              </el-table-column>
              <el-table-column align="center" label="状态" min-width="150px">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">已入选</span>
                  <span v-if="scope.row.status === 0">未入选</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="400px" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handlecheck(scope.row)">查看</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    v-if="scope.row.status === 0"
                    @click="handlechoose(scope.row.id)"
                  >评选</el-button>
                  <el-button type="success" size="small" @click="handleupload(scope.row.id)">上传资源</el-button>
                  <el-button type="danger" size="small" @click="handledelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table> -->
              <el-table ref="Tablelist" :data="list" border stripe>
              <el-table-column align="center" label="标题" min-width="200px">
                <template slot-scope="scope">{{ scope.row.ocName}}</template>
              </el-table-column>
              <el-table-column align="center" label="作者" min-width="120px">
                <template slot-scope="scope">{{ scope.row.ocWrite}}</template>
              </el-table-column>
              <el-table-column align="center" label="年龄" min-width="80px">
                <template slot-scope="scope">{{ scope.row.age}}</template>
              </el-table-column>
              <!-- <el-table-column align="center" label="分组" min-width="100px">
                <template slot-scope="scope">{{ scope.row.teamCode}}</template>
              </el-table-column> -->
              <el-table-column align="center" label="操作" min-width="400px" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="toDetailPath('video_detail',scope.row.id)">查看</el-button>
                  <el-button type="success" size="small" @click="handleupload(scope.row.id)">上传资源</el-button>
                  <el-button type="danger" size="small" @click="handledelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 查看弹框 -->
            <!-- <el-dialog
              :visible.sync="checkVisible"
              :title="checkList.title"
              center
              width="50%"
              :before-close="closecheck"
            >
              <p>{{checkList.title}}</p>
              <video
                id="video"
                style="width:100%;height:auto;"
                :src="checkList.url"
                autoplay
                controls="controls"
                controlslist="nodownload"
              />
            </el-dialog> -->
            <!-- 上传资源弹框 -->
            <el-dialog :visible.sync="uploadVisible" title="上传资源" center width="50%">
              <el-form
                :rules="rules"
                ref="ruleForm"
                :model="uploadList"
                label-width="150px"
                label-position="left"
              >
                <el-form-item label="上传资源" prop="reviewStatus" class="is-required">
                  <Upload
                    ref="imgUpload"
                    :fileType="2"
                    :index="1"
                    name="image"
                    :Url="''"
                    accept=".mp4, .png"
                    :multiple="true"
                    @uploadSuccess="imageSuccess"
                    preImgParentId="preImgParentId"
                    :max_file_size="'20mb'"
                  ></Upload>
                </el-form-item>
              </el-form>
              <div style="text-align:center;padding-top:50px;">
                <el-button type="primary" size="small" @click="sure">确定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import data from '../../data/data'
import Upload from '@/components/Upload/index'
export default {
  components: { Upload },
  data() {
    return {
      list: [],
      operateCode: 'ead607ff-9e57-11ea-ba14-9c5c8e7be297',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        status: '',
        title: '',
        ocName: '',
        teamCode: ''
      },
      //   查看
      checkVisible: false,
      checkdetail: {},
      //   上传资源
      uploadVisible: false,
      uploadList: {},
      rules: {
        reviewStatus: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        reviewInfo: [{ required: true, message: '不能为空！', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getList() {
      const params = {}
      const _this = this
      params.pageSize = this.listQuery.pageSize
      params.pageNum = this.listQuery.pageNum
      params.ocName = this.listQuery.ocName
      // params.status = this.listQuery.status
      if (this.listQuery.teamCode === '') {
        params.teamCode = null
      } else {
        params.teamCode = this.listQuery.teamCode
      }
      params.operateCode = this.operateCode
      this.$apis.getBackList(params).then(res => {
        console.log(res)
        _this.list = res.data.data.list
      })
    },
    toPath(path) {
      this.$router.push({ path: '/' + path })
    },
    // 查看
    toDetailPath(path, id) {
      this.$router.push({
        name: path,
        params: {
          id: id
        }
      })
    },
    // 查看
    // handlecheck(item) {
    //   this.checkVisible = true
    //   this.checkdetail = item
    // },
    closecheck() {
      var video = document.getElementById('video')
      if (video !== null && video.play) {
        video.pause()
      }
      this.checkVisible = false
    },
    // 评选
    handlechoose(id) {
      // 评选成功提示
      this.$message.success('评选成功！')
    },
    // 上传资源
    handleupload(id) {
      this.uploadVisible = true
    },
    handleSelection(val) {
      this.multipleSelection = val
    },
    // 删除
    handledelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {}
          const _this = this
          params.id = id
          params.status = 2
          params.operateCode = this.operateCode
          _this.$apis.backDelete(params).then(res => {
            // this.contentsList.splice(index, 1)
            if (res.status.returnCode === 100) {
              _this.$message.success('删除成功！')
              _this.getList()
            } else {
              _this.$message.error('删除失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    sure() {},
    imageSuccess(url) {
      var _this = this
      _this.single.path = url
      if (_this.single.path === null || _this.single.path === undefined) {
        _this.$message.error('请选择图片！')
        return false
      } else {
        _this.$apis.updatePhoto(_this.single).then(res => {
          if (res.status.returnCode === 100) {
            _this.$message.success('修改成功！')
            _this.getList()
            _this.closeDialog()
          }
        })
      }
    }
  },
  created() {
    var status = window.sessionStorage.getItem('hasLogin')
    if (status * 1 !== 1) {
      this.$message.error('您无权进入此页面，请先登录')
      this.$router.push({
        path: '/login'
      })
    } else {
      this.getList()
    }
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
html {
  background-color: white;
}
</style>
