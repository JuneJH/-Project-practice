
<template>
  <div class="show-list">
    <div class="list-title">
      <span>最近比赛数据</span>
      <span class="el-icon-document-add add-btn" @click="addScheduleHandle"></span>
    </div>
    <!-- 添加弹出框 -->
    <el-dialog
      title="添加一场比赛"
      :visible.sync="isShowForm4add"
      @close="dialogCloseHandle"
      center
      width="30%"
      :modal-append-to-body="false"
    >
      <mform formType="立即添加" @modify="addSchedule" @cancelEvent="cancelHandle" />
    </el-dialog>
    <!-- 修改弹出框 -->
    <el-dialog
      title="比赛详细信息"
      :visible.sync="isShowForm"
      @close="dialogCloseHandle"
      center
      width="30%"
      :modal-append-to-body="false"
    >
      <mform
        formType="立即修改"
        @modify="modifyScheduleById"
        @cancelEvent="cancelHandle"
        isEdit="true"
        isShowEdit="true"
      />
    </el-dialog>

    <el-table
      :data="scheduleList"
      :header-row-style="{backgroundColor:'transparent',color:'#fff'}"
      :header-cell-style="{background:'transparent',color:'#fff',borderBottom:'6px solid #666',textAlign:'center'}"
      :row-style="{background:'transparent',color:'#fff',textAlign:'center',borderColor:'#999'}"
      :cell-style="{background:'transparent',color:'#fff',borderColor:'#999',textAlign:'center'}"
      style="background:transparent;max-height:800px;borderBottom:none"
      height="900px"
      class="table-class"
      @row-dblclick="handler"
    >
      <el-table-column prop="mtime" label="日期" width="200"></el-table-column>
      <el-table-column prop="mhost" label="主队"></el-table-column>
      <el-table-column prop="mguest" label="客队" width="200"></el-table-column>
      <el-table-column prop="mshoot" label="射门数" width="65"></el-table-column>
      <el-table-column prop="mshoottarget" label="射正数" width="65"></el-table-column>
      <el-table-column prop="mscore" label="比分" width="200"></el-table-column>
    </el-table>
    <div class="tips">*本表数据来源于用户，双击进行修改,暂不支持删除数据</div>
  </div>
</template>

<script>
import api from "../../services/api";
import mform from "./form";
export default {
  created() {
    this.getScheduleData();
  },
  data() {
    return {
      scheduleList: [],
      // 是否显示编辑表单
      isShowForm: false,
      isShowForm4add: false
    };
  },
  components: { mform },
  methods: {
    getScheduleData() {
      const uid = this.$store.state.userInfo.uid;
      api.getAllSchedule({ params: { uid } }).then(data => {
        this.scheduleList = JSON.parse(data.data.content);
        if (this.scheduleList == null || this.scheduleList.length == 0) {
          this.scheduleList = false;
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
    modifyScheduleById(formData) {
      api.modifyScheduleById({ params: { ...formData } }).then(data => {
        if (data.data.status == 1) {
          this.openTips("修改成功！", "success");
          this.isShowForm = false;
          this.getScheduleData();
        }
      });
    },
    // 添加一场比赛
    addScheduleHandle() {
      this.isShowForm4add = true;
    },
    addSchedule(formData) {
      // 添加用户ID进行添加
      const uid = this.$store.state.userInfo.uid;
      formData.uid = uid;
      api.addSchedule({ params: { ...formData } }).then(data => {
        if (data.data.status == 1) {
          this.openTips("添加成功！", "success");
          this.isShowForm4add = false;
          this.getScheduleData();
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
.tips{
  color:#f40;
  font-size: 12px;
  text-align: right;
  margin-top:10px;
}
</style>