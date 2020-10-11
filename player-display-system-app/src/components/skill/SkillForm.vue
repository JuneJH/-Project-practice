<template>
  <div class="form">
    <el-form label-width="80px" :model="formData" :disabled="isEdit">
      <el-form-item label="比赛日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.sdate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="比赛名字">
        <el-input v-model="formData.sname"></el-input>
      </el-form-item>
      <el-form-item label="进球数">
        <el-input v-model="formData.sgoal"></el-input>
      </el-form-item>
      <el-form-item label="助攻数">
        <el-input v-model="formData.sassists"></el-input>
      </el-form-item>
      <el-form-item label="越位数">
        <el-input v-model="formData.soffside"></el-input>
      </el-form-item>
      <el-form-item label="拦截数">
        <el-input v-model="formData.sintercept"></el-input>
      </el-form-item>
      <el-form-item label="跑动时间">
        <el-input v-model="formData.stime"></el-input>
      </el-form-item>
      <el-form-item label="举办单位">
        <el-input v-model="formData.shost"></el-input>
      </el-form-item>
      <el-form-item label="扑救数">
        <el-input v-model="formData.sput"></el-input>
      </el-form-item>
      <el-form-item label="射门数">
        <el-input v-model="formData.sshoot"></el-input>
      </el-form-item>
      <el-form-item label="射正数">
        <el-input v-model="formData.sshoottarget"></el-input>
      </el-form-item>
    </el-form>
    <div class="delet-btn">
      <el-button type="primary" v-show="!isEdit" @click="modifyHandle">{{formType}}</el-button>
      <el-button v-show="!isEdit" @click="cancelHandle">取消</el-button>
      <el-button
        class="btn"
        type="primary"
        icon="el-icon-edit"
        circle
        @click="openEdit"
        v-show="isShowEdit"
      ></el-button>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.formData = { ...this.$store.state.currForm };
  },
  watch: {
    "$store.state.currForm": {
      handler() {
        this.formData = { ...this.$store.state.currForm };
      },
      immediate: true
    }
  },
  props: ["formType", "isEdit", "isShowEdit"],
  data() {
    return {
      formData: {}
    };
  },
  computed: {},
  methods: {
    openEdit() {
      this.isEdit = !this.isEdit;
    },
    modifyHandle() {
      if (this.formData.sdate && this.formData.sdate instanceof Date) {
        this.formData.sdate = this.formData.sdate.toLocaleDateString();
      }
      this.$emit("addSkill", this.formData);
    },
    cancelHandle() {
      this.$emit("cancelEvent");
    }
  }
};
</script>
<style lang="scss" scoped>
.delet-btn {
  text-align: right;
}
</style>