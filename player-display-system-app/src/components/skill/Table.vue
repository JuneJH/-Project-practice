
<template>
  <div class="show-list">
    <div class="list-title">
      <span>个人技术统计数据</span>
      <span class="el-icon-document-add add-btn" @click="addSkillHandle"></span>
    </div>
    <!-- 添加弹出框 -->
    <el-dialog
      title="添加一条技术数据"
      :visible.sync="isShowForm4add"
      @close="dialogCloseHandle"
      center
      width="35%"
      :modal-append-to-body="false"
    >
      <mform formType="立即添加" @addSkill="addSkillById" @cancelEvent="cancelHandle" />
    </el-dialog>
    <el-table
      :data="skillList"
      :header-row-style="{backgroundColor:'transparent',color:'#fff'}"
      :header-cell-style="{background:'transparent',color:'#fff',borderBottom:'6px solid #666',textAlign:'center'}"
      :row-style="{background:'transparent',color:'#fff',textAlign:'center',borderColor:'#999'}"
      :cell-style="{background:'transparent',color:'#fff',borderColor:'#999',textAlign:'center'}"
      style="background:transparent;max-height:600px;borderBottom:none"
      height="450px"
      class="table-class"
      @row-dblclick="handler"
    >
      <el-table-column prop="sdate" label="比赛日期" width="200"></el-table-column>
      <el-table-column prop="sname" label="比赛名字" width="200"></el-table-column>
      <el-table-column prop="sgoal" label="进球数" width="200"></el-table-column>
      <el-table-column prop="sassists" label="助攻数" width="65"></el-table-column>
      <el-table-column prop="soffside" label="越位数" width="65"></el-table-column>
      <el-table-column prop="sintercept" label="拦截数" width="200"></el-table-column>
      <el-table-column prop="stime" label="参与比赛时间" width="200"></el-table-column>
      <el-table-column prop="shost" label="举办单位" width="200"></el-table-column>
      <el-table-column prop="sput" label="扑救数" width="200"></el-table-column>
      <el-table-column prop="sshoot" label="射门数" width="200"></el-table-column>
      <el-table-column prop="sshoottarget" label="射正数" width="200"></el-table-column>
    </el-table>
    <div class="tips">*本表数据来源于用户,暂不支持删除、修改数据</div>
  </div>
</template>

<script>
import api from "../../services/api";
import mform from "./SkillForm";
export default {
  created() {
    this.getSkillData();
  },
  data() {
    return {
      skillList: [],
      // 是否显示编辑表单
      isShowForm: false,
      isShowForm4add: false
    };
  },
  components: { mform },
  methods: {
    getSkillData() {
      const uid = this.$store.state.userInfo.uid;
      api.getAllSkill({ params: { uid } }).then(data => {
        if (data.data.status == 1) {
          this.skillList = JSON.parse(data.data.content);
          if (this.skillList == null || this.skillList.length == 0) {
            this.skillList = false;
          }
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
    // 通过赛程ID修改赛程表
    modifySkillById(formData) {
      api.modifySkillById({ params: { ...formData } }).then(data => {
        if (data.data.status == 1) {
          this.openTips("添加成功！", "success");
          this.isShowForm = false;
          this.getSkillData();
        }
      });
    },
    // 添加一场比赛
    addSkillHandle() {
      this.isShowForm4add = true;
    },
    addSkillById(formData) {
      // 添加用户ID进行添加
      const uid = this.$store.state.userInfo.uid;
      formData.uid = uid;
      api.addSkill({ params: { ...formData } }).then(data => {
        if (data.data.status == 1) {
          this.openTips("添加成功！", "success");
          this.isShowForm4add = false;
          this.getSkillData();
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
</style>