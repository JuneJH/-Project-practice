<template>
  <div class="upload-img" v-loading="loading">
    <div class="add-container" style="{background:url}">
      <i class="el-icon-plus add"></i>
    </div>
    <input
      type="file"
      ref="inputHeader"
      class="input-header"
      @change="changeHander"
      :visible.sync="dialogVisible"
    />
    <img :src="url" class="previwe" v-if="isPreviwe" />
    <div class="button-box">
      <el-button type="success" @click="uploadHander">提交头像</el-button>
      <p></p>
      <el-button type="danger" @click="deleteHeader">删除重选</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/services/api";
export default {
  data() {
    return {
      url: "#",
      isPreviwe: false,
      dialogVisible: false,
      loading: false
    };
  },
  methods: {
    changeHander() {
      const files = this.$refs.inputHeader.files;
      let imgUrl = this.getObjectURL(files[0]);
      if (imgUrl) {
        this.url = imgUrl;
        this.isPreviwe = true;
      }
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //  提交头像
    uploadHander() {
      this.loading = true;
      this.dialogVisible = false;
      const files = this.$refs.inputHeader.files[0];
      if (!files) return;
      const formData = new FormData();
      const uid = this.$store.state.userInfo.uid;
      formData.append("header", files);
      formData.append("uid", uid);
      api.uploadHead(formData).then(res => {
        if (res.data) {
          this.$store.state.userInfo.headImg =
            "http://127.0.0.1:12306" + res.data;
          this.$emit("close");
          this.loading = false;
        }
      });
    },
    deleteHeader() {
      this.isPreviwe = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-img {
  width: 100%;
  height: 200px;
  position: relative;
  // background-color: red;
  .add {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
  }
  .previwe {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 100%;
    border-radius: 5px;
  }
  .add-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 100%;
    background-color: #eee;
    border-radius: 5px;
  }
  .input-header {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 100%;
    opacity: 0;
  }
  .button-box {
    padding-top: 50px;
    width: 160px;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    p {
      padding: 10px;
    }
  }
}
</style>