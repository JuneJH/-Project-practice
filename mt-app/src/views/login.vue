<template>
  <div class="login">
    <div class="login-content">
      <el-row class="header-contail">
        <h1>
          <a class="site-logo" href="http://www.meituan.com">美团网</a>
        </h1>
      </el-row>
      <el-row>
        <el-col class="left-pic" :span="16">
          <img
            src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
            width="480"
            height="370"
            alt="美团网"
          />
        </el-col>
        <el-col :span="8" class="login-input">
          <div class="validate-info" v-if="errorMsg">
            <i class="el-icon-remove"></i>
            {{errorMsg}}
          </div>
          <h4>账号登录</h4>
          <div class="username">
            <i></i>
            <input type="text" placeholder="用户名" v-model="username" />
          </div>
          <div class="password">
            <i></i>
            <input type="password" placeholder="密码" v-model="password" />
          </div>
          <p class="tip">
            <a href="#">忘记密码？</a>
          </p>
          <div class="login-btn">
            <button type="button" @click="loginHandle">登录</button>
          </div>
          <p class="no-accunt">
            <span>还没有账号？</span>
            <router-link :to="{name:'register'}">免费注册</router-link>
          </p>
          <div class="other-accunt">
            <p>用合作账号登录</p>
            <div class="icon-link">
              <i class="el-icon-eleme"></i>
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <footer>
          <ul>
            <li>
              <a href="#">关于美团</a>
            </li>
            <li>
              <a href>加入我们</a>
            </li>
            <li>
              <a href>商家入驻</a>
            </li>
            <li>
              <a href>帮助中心</a>
            </li>
            <li>
              <a href>美团手机版</a>
            </li>
          </ul>
          <p>©2018 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
        </footer>
      </el-row>
    </div>
  </div>
</template>

<script>
import getData from "@/service/api";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMsg: ""
    };
  },
  created(){
    if(this.$store.state.registerUserName){
      this.username = this.$store.state.registerUserName
    }

  },
  methods: {
    loginHandle() {
      //   console.log(this.username, this.password);
      this.errorMsg = "";
      if (this.username == "") {
        this.errorMsg = "请填写登录账号";
        return false;
      } else if (this.username.length < 4 || this.username.length > 16) {
        this.errorMsg = "用户名必须为4-16位的字母数字下划线组成";
        return false;
      }
      if (this.password == "") {
        this.errorMsg = "请填写登录密码";
        return false;
      } else if (this.password.length < 6 && this.password.length > 16) {
        this.errorMsg = "密码必须为6-16位的字母数字下划线组成";
        return false;
      }
      getData
        .login({ params: { userName: this.username, password: this.password } })
        .then(res => {
          if (res.data.status == "success") {
            this.$store.commit("setUserName", this.username);
            this.$router.push({path:'/'})
          } else {
            this.errorMsg = res.data.msg;
          }
        });
    }
  }
};
</script>
<style lang='scss'>
@import "@/assets/css/login/login";
</style>