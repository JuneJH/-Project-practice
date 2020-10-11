<template>
  <div class="login-container">
    <video class="login_bg" src="../assets/video/v5.webm" muted loop autoplay></video>
    <div class="login">
      <div class="login-form">
        <h2>
          登
          <span></span>录
        </h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="70px"
          class="demo-ruleForm"
        >
        <!-- 登录用户输入账号框 -->
          <el-form-item label="用户ID" prop="userID">
            <el-input type="text" v-model="ruleForm.userID" autocomplete="off"></el-input>
          </el-form-item>
           <!-- 用户输入密码框 -->
          <el-form-item label="密 码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="login-btn">
            <el-button type="success" @click="submitForm('ruleForm')" class="login-btn-1">登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
          <div class="retgister-wrapper">
            <span>还没有账号？</span>
            <router-link to="/register" class="re-btn">立即注册</router-link>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/services/api";
import baseUrl from "../services/baseurl"
export default {
  mounted(){
    if(this.$store.state.uid){
      this.ruleForm.userID = this.$store.state.uid
    }

  },
  data() {
    // 前端验证
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户ID"));
      } else if (!Number.isInteger(+value)) {
        callback(new Error("用户ID是纯数字"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      baseUser:baseUrl,
      src:'',
      ruleForm: {
        userID: "",
        checkPass: ""
      },
      rules: {
        userID: [{ validator: validateUserName, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const loading = this.$loading({
        lock: true,
        text: "登陆中...",
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,0.1)"
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          const user = this[formName];
          const params = {uid:user.userID, upassword:user.checkPass}
          api.login({params}).then(data => {
            loading.close();
            if (data.data.status == 1) {
              const userInfo = JSON.parse(data.data.content);
              console.log("login",userInfo.headImg)
              userInfo.headImg = this.baseUser + userInfo.headImg;
              this.$store.commit("setUserInfo", userInfo);
              window.sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
              this.$router.push("/home");
            } else {
              this.showTip(data.data.msg);
            }
          });
        } else {
          loading.close();
          this.showTip("请填写登录信息");
          return false;
        }
      });
    },
    showTip(info) {
      const h = this.$createElement;
      this.$notify({
        title: "错误消息",
        type: "error",
        message: h("i", { style: "color: red" }, info)
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  // background-color: orange;
  .login_bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .login {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    .login-form {
      position: absolute;
      width: 400px;
      height: 315px;
      left: 50%;
      top: 50%;
      margin-left: -200px;
      margin-top: -155px;
      background-color: rgba($color: #fff, $alpha: 0.6);
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px 30px 0 20px;
      h2 {
        font-size: 24px;
        font-weight: 700;
        color: #666;
        text-align: center;
        margin: 20px 0 40px 20px;
        span {
          display: inline-block;
          width: 20px;
        }
      }
      .demo-ruleForm {
        margin-right: 10px;
        .login-btn-1 {
          margin-right: 60px;
          width: 100%;
          margin-top: 10px;
        }
      }
      .retgister-wrapper{
        text-align: right;
        font-size: 12px;
        .re-btn{
          color:#f40;
        }

      }
    }
  }

}
</style>

