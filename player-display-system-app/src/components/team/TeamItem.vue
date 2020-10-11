<template>
  <div class="team-detail">
    <el-row>
      <el-col :span="6" class="descript-container">
        <div class="team-title">
          <h3>{{ team.tname }}</h3>
          <div class="team-descirpt">{{ team.tdescribe ? team.tdescribe:"该球队还未添加描述" }}</div>
        </div>
      </el-col>
      <el-col :span="18" class="base-team-info">
        <el-row class="info-item">
          <el-col :span="12">总进球数：{{team.tgoal}}</el-col>
          <el-col :span="12">总进球数：{{team.tfumble}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="12">总进球数：{{team.tsmatch}}</el-col>
          <el-col :span="12">总进球数：{{team.ttratio}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="12">总进球数：{{team.twin}}</el-col>
        </el-row>

        <el-row>
          <h5>球员</h5>
          <div class="team-player">
            <div class="player-item" v-for="(item,index) in playerList" :key="item.id+index">
              <div class="header">
                <img :src="item.headImg" />
              </div>
              <span>{{ item.id }}</span>
              <span>{{ item.name }}</span>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../../services/api";
import baseUrl from "../../services/baseurl";
export default {
  data() {
    return {
      playerList: [],
      baseUrl
    };
  },
  props: ["team"],
  mounted() {
    this.baseUrl = baseUrl;
    if (this.team.tplayerlist) {
      const playerList = this.team.tplayerlist.split(",");
      playerList.map(ele => {
        api.queryUserInfoById({ params: { uid: ele } }).then(data => {
          if (data.data.status == 1) {
            const temp = JSON.parse(data.data.content);
            this.playerList.push({
              id: temp.uid,
              name: temp.uname,
              headImg: this.baseUrl + temp.headImg
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.team-detail:nth-child(2n + 1){
  background-color: red;
}
.team-detail {
  background-color: #008c8c;
  height: 100%;
  border-radius: 5px;
  // .descript-container{
  //     background-image: url("../../assets/video/i1.webp");
  // }
  h3 {
    text-align: center;
    margin: 30px 0 20px;
    font-size: 20px;
  }
  .team-descirpt {
    padding: 10px;
    height: 220px;
    overflow-y: auto;
    font-size: 12px;
    color: #eee;
    margin-left: 10px;
    font-size: 12px;
    line-height: 1.5;
  }
  h5 {
    margin-top: 10px;
    color: #ddd;
    font-size: 20px;
  }
  .team-player {
    display: flex;
    margin-top: 5px;
    flex-wrap: wrap;
    height: 150px;
    overflow-y: auto;

    .player-item {
      width: 60px;
      height: 60px;
      //   margin-left: 25px;
      margin-top: 25px;
      text-align: center;
      .header {
        width: 45px;
        height: 45px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      span {
        display: block;
        font-size: 12px;
        margin-top: 5px;
        text-align: center;
        height: 10px;
      }
    }
  }
  .base-team-info {
    margin-top: 30px;
    font-size: 18px;
    .info-item {
      margin: 20px 0 10px;
      color: #ddd;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}

</style>