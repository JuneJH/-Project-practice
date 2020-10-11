<template>
  <div class="form">
       <el-table-column prop="tname" label="球队名字" width="200"></el-table-column>
      <el-table-column prop="tgoal" label="总进球数" width="100"></el-table-column>
      <el-table-column prop="tfumble" label="总丢球数" width="100"></el-table-column>
      <el-table-column prop="tsmatch" label="总比赛场次" width="100"></el-table-column>
      <el-table-column prop="twin" label="胜率" width="65"></el-table-column>
      <el-table-column prop="ttratio" label="球队能力" width="100"></el-table-column>
    <el-form label-width="85px" :model="formData" :disabled="isEdit">
      <el-form-item label="球队名字">
        <el-input v-model="formData.tname"></el-input>
      </el-form-item>
      <el-form-item label="总进球数">
        <el-input v-model="formData.tgoal"></el-input>
      </el-form-item>
      <el-form-item label="总比赛场次">
        <el-input v-model="formData.tsmatch"></el-input>
      </el-form-item>
      <el-form-item label="胜率">
        <el-input v-model="formData.twin"></el-input>
      </el-form-item>
       <el-form-item label="添加球员(逗号分割)">
        <el-input v-model="formData.tplayerlist"></el-input>
      </el-form-item>
      <el-form-item label="总丢球数">
        <el-input v-model="formData.tfumble"></el-input>
      </el-form-item>
      <el-form-item label="描述球队">
        <el-input v-model="formData.tdescribe"></el-input>
      </el-form-item>
    </el-form>
    <div class="delet-btn">
      <el-button type="primary" v-show="!isEdit" @click="addTeamHandler">{{formType}}</el-button>
      <el-button v-show="!isEdit" @click="cancelHandle">取消</el-button>
      <el-button class="btn" type="primary" icon="el-icon-edit" circle @click="openEdit" v-show="isShowEdit"></el-button>
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
  props: ["formType","isEdit","isShowEdit"],
  data() {
    return {
      formData: {},
    };
  },
  computed:{

  },
  methods: {
    openEdit() {
      this.isEdit = !this.isEdit;
    },
    addTeamHandler() {
        this.formData.tplayerlist && (this.formData.tplayerlist = this.formData.tplayerlist.replace(/，/g,","))
      this.$emit("modify", this.formData);
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