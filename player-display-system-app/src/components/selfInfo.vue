<template>
  <ul class="user-info">
    <div class="head-img">
      <!-- $store.state.userInfo.headImg -->
      <img
        :src="$store.state.userInfo.headImg"
        alt
        class="header"
        @click="uploadHeader"
      />
      <el-dialog title="上传头像" :visible.sync="dialogVisible" width="30%" :append-to-body="true">
           <uploadHeader @close="closeDiaolog"/>
      </el-dialog>
    </div>
    <h3>基本信息</h3>
    <li class="info-item">
      <span class="title">全名/花名:</span>
      <span class="info">{{$store.state.userInfo.uname}}</span>
    </li>
    <li class="info-item">
      <span class="title">场上位置:</span>
      <span class="info">{{$store.state.userInfo.uplace}}</span>
    </li>
    <li class="info-item">
      <span class="title">所属球队:</span>
      <span class="info">{{$store.state.userInfo.uteam}}</span>
    </li>
    <li class="info-item">
      <span class="title">钟爱号码:</span>
      <span class="info">{{$store.state.userInfo.unumber}}</span>
    </li>
    <li class="info-item">
      <span class="title">目前身高:</span>
      <span class="info">{{$store.state.userInfo.uheight}}</span>
    </li>
    <li class="info-item">
      <span class="title">目前体重:</span>
      <span class="info">{{$store.state.userInfo.uweight}}</span>
    </li>
    <li class="info-item">
      <span class="title">目前年龄:</span>
      <span class="info">{{$store.state.userInfo.uage}}</span>
    </li>
    <h3>技术特点</h3>
    <li class="skill">
      <el-tag class="tag">标签一</el-tag>
      <el-tag class="tag" type="success">标签二</el-tag>
      <el-tag class="tag" type="info">标签三</el-tag>
      <el-tag class="tag" type="warning">标签四</el-tag>
      <el-tag class="tag" type="danger">标签五</el-tag>
    </li>

    <h3>球队经历</h3>
    <li class="team">
      <el-tag class="tag">{{$store.state.userInfo.uteam}}</el-tag>
    </li>
  </ul>
</template>
<script>
import uploadHeader from "./uploadHeader";
export default {
  data(){
    return {
      dialogVisible:false,
    }
  },
  components:{
    uploadHeader,
  },
    methods: {
    uploadHeader() {
      this.dialogVisible = true
    },
    closeDiaolog(){
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  max-width: 300px;
  .head-img {
    text-align: center;
    .header {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0px 0px 5px 1px #333;
        transform: scale(1.1);
      }
    }
  }

  h3 {
    margin: 5px 0 10px;
  }
  .info-item {
    border-bottom: 1px solid #dcdfe6;
    cursor: pointer;
    padding: 10px 0;
    .title {
      color: #909399;
    }
    .info {
      float: right;
      color: #303133;
      font-weight: 500;
    }
  }
  .skill {
    padding-top: 10px;
    .tag {
      margin: 2px 5px;
    }
  }
  .team {
    .tag {
      margin: 2px 5px;
    }
  }
}
</style>