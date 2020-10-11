<template>
  <div class="form">
    <el-form label-width="80px" :model="formData" :disabled="isEdit">
      <el-form-item label="比赛时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.mtime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="比赛主队">
        <el-input v-model="formData.mhost"></el-input>
      </el-form-item>
      <el-form-item label="比赛客队">
        <el-input v-model="formData.mguest"></el-input>
      </el-form-item>
      <el-form-item label="射门数">
        <el-input v-model="formData.mshoot"></el-input>
      </el-form-item>
      <el-form-item label="射正数">
        <el-input v-model="formData.mshoottarget"></el-input>
      </el-form-item>
      <el-form-item label="最终比分">
        <el-input v-model="formData.mscore"></el-input>
      </el-form-item>
    </el-form>
    <div class="delet-btn">
      <el-button type="primary" v-show="!isEdit" @click="modifyHandle">{{formType}}</el-button>
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
    modifyHandle() {
      if(this.formData.mtime && this.formData.mtime instanceof Date){
        this.formData.mtime = this.formData.mtime.toLocaleDateString()
      }
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