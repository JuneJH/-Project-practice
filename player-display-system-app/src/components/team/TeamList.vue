
<template>
  <div class="show-list">
    <div class="list-title">
      <span>所有球队</span>
      <span class="el-icon-document-add add-btn" @click="addTeamHandle"></span>
    </div>
    <!-- 添加弹出框 -->
    <el-dialog
      title="添加一支球队"
      :visible.sync="isShowForm4add"
      @close="dialogCloseHandle"
      center
      width="30%"
      :modal-append-to-body="false"
    >
      <mform formType="立即添加" @modify="addTeam" @cancelEvent="cancelHandle" />
    </el-dialog>
    <el-table
      :data="teamList"
      height="350"
      border
      style="width: 100%"
      @row-dblclick="clickTeamDetail"
      :highlight-current-row="true"
    >
      <el-table-column prop="tname" label="球队名字" width="200"></el-table-column>
      <el-table-column prop="tgoal" label="总进球数" width="100"></el-table-column>
      <el-table-column prop="tfumble" label="总丢球数" width="100"></el-table-column>
      <el-table-column prop="tsmatch" label="总比赛场次" width="100"></el-table-column>
      <el-table-column prop="twin" label="胜率" width="65"></el-table-column>
      <el-table-column prop="ttratio" label="球队能力" width="100"></el-table-column>
    </el-table>
    <div class="tips">*双击查看详情</div>
  </div>
</template>

<script>
import api from "../../services/api";
import mform from "./teamFrom";
import baseUrl from "../../services/baseurl"
export default {
  created() {
    this.getAllTeam();
  },
  data() {
    return {
      teamList: [],
      // 是否显示编辑表单
      isShowForm: false,
      isShowForm4add: false,
      baseUrl,
    };
  },
  components: { mform },
  methods: {
    getAllTeam() {
      const uid = this.$store.state.userInfo.uid;
      api.getAllTeam({ params: { uid } }).then(data => {
        this.teamList = JSON.parse(data.data.content);
        if (this.teamList == null || this.teamList.length == 0) {
          this.teamList = false;
        }
      });
    },
    handler(row, column, event) {
      this.$store.commit("setCurrForm", row);
      this.isShowForm = true;
    },
    dialogCloseHandle() {
      // 关闭修改表单时，清空，避免数据混乱
      this.$store.commit("setCurrForm", {});
    },
    //消息提示框
    openTips(message, type) {
      this.$message({
        message,
        type
      });
    },
    //关闭修改窗口
    cancelHandle() {
      this.isShowForm = false;
    },
    // 添加一支球队
    addTeamHandle() {
      this.isShowForm4add = true;
    },
    //查看详情
    clickTeamDetail(row) {
      const team = {
        teamTile: { title: row.tname, descript: row.tdescribe },
        teamPlayerList: []
      };
      if (row.tplayerlist) {
        const playerList = row.tplayerlist.split(",");
        playerList.map(ele => {
          api.queryUserInfoById({ params: { uid: ele } }).then(data => {
            if (data.data.status == 1) {
              const temp = JSON.parse(data.data.content);
              team.teamPlayerList.push({
                id: temp.uid,
                name: temp.uname,
                url: this.baseUrl + temp.headImg
              });
            }
            this.$store.commit("setTeam", team);
          });
        });
      } else {
        this.$store.commit("setTeam", team);
      }
    },
    addTeam(formData) {
      api.addTeam({ params: { ...formData } }).then(data => {
        if (data.data.status == 1) {
          this.openTips("添加成功！", "success");
          this.isShowForm4add = false;
          this.getAllTeam();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-class {
  margin-left: 20px;
  cursor: pointer;
}
.list-title {
  height: 70px;
  line-height: 70px;
  font-size: 25px;
  color: #e2e2e2;
  font-weight: 500;
  padding-left: 20px;
  .add-btn {
    float: right;
    margin-top: 40px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.6s;
    &:hover {
      box-shadow: 0px 0px 5px 2px #e2e2e2;
      transform: scale(1.1);
    }
  }
}
.tips {
  color: #f40;
  font-size: 12px;
  text-align: right;
  margin-top: 10px;
}
.el-table th {
  background-color: transparent;
}
</style>