<template>
  <div class="register">
    <div class="header">
      <header>
        <a href="#" class="site-logo"></a>
        <div class="login">
          <span>已有美团账号?</span>
          <router-link :to="{name: 'login'}">登录</router-link>
        </div>
      </header>
    </div>
    <div class="register-container">
      <div class="register-form">
        <div class="username">
          <span class="tip-span">用户名</span>
          <input
            type="text"
            placeholder="用户名"
            v-model="userName"
            @focus="startCheckUserName"
            @blur="leaveCheckUserName"
          />
          <div class="error-msg" v-if="userV.userNameMsg">
            <i class="el-icon-remove"></i>
            <span>{{userV.userNameMsg}}</span>
          </div>
        </div>
        <div class="password">
          <span class="tip-span">创建密码</span>
          <input
            type="password"
            placeholder="密码"
            v-model="password"
            @focus="startCheckPassword"
            @blur="leaveCheckPassword"
            @input="creatPasswordCheck"
          />
          <div class="error-msg" v-if="userV.passwordMsg">
            <i class="el-icon-remove"></i>
            <span>{{userV.passwordMsg}}</span>
          </div>
        </div>
        <div class="password-status">
          <div :class="['color-progress',passwordStatuClass]"></div>
          <span class="password-span">弱</span>
          <span class="password-span">中</span>
          <span class="password-span">强</span>
        </div>
        <div class="repassword">
          <span class="tip-span">再次确认密码</span>
          <input
            type="password"
            placeholder="再次输入密码"
            v-model="repassword"
            @focus="startCheckRepassword"
            @blur="leaveCheckRepassword"
          />
          <div class="error-msg" v-if="userV.repasswordMsg">
            <i class="el-icon-remove"></i>
            <span>{{userV.repasswordMsg}}</span>
          </div>
        </div>
        <div class="agree-register">
          <button @click="registerBtn">同意以下协议并注册</button>
        </div>
      </div>
    </div>
    <footer class="footer--mini">
      <p class="copyright">
        ©
        <a class="f1" href="https://www.meituan.com">meituan.com</a>&nbsp;
        <a class="f1" target="_blank" href="http://www.miibeian.gov.cn/">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
      </p>
    </footer>
  </div>
</template>
<script>
import getData from '@/service/api'
export default {
  data() {
    return {
      userName: "",
      password: "",
      repassword: "",
      userV: {
        userNameMsg: "",
        repasswordMsg: "",
        passwordMsg: ""
      },
      passwordStatuClass: ""
    };
  },
  methods: {
    startCheckUserName() {
      this.userV.userNameMsg = "";
    },
    startCheckPassword() {
      this.userV.passwordMsg = "";
    },
    startCheckRepassword() {
      this.userV.repasswordMsg = "";
    },
    leaveCheckUserName() {
      if (this.userName.length < 4 || this.userName.length > 16) {
        this.userV.userNameMsg = "用户名必须为4-16位的字母数字下划线组成";
      }
    },
    leaveCheckPassword() {
      if (this.password.length < 6 || this.password.length > 16) {
        this.userV.passwordMsg = "密码必须为6-16位的字母数字下划线组成";
      }
    },
    leaveCheckRepassword() {
      if (this.password != this.repassword) {
        this.userV.repasswordMsg = "两次输入的密码不一致";
      }
    },
    creatPasswordCheck() {
      const regNum = /[0-9]+/;
      const regCase = /[A-z]+/;
      const regStr = /[-_/\.,]+/
      this.passwordStatuClass = "";
      if(this.password.length == 0){
          return;
      }

      if (this.password.length > 20) {
        this.passwordStatuClass = "strong";
        return;
      }
      if (regNum.test(this.password) && regCase.test(this.password) && regStr.test(this.password) && this.password.length >= 6) {
        this.passwordStatuClass = "strong";
      }else if((regNum.test(this.password) || regCase.test(this.password) || regStr.test(this.password)) && this.password.length > 6){
           this.passwordStatuClass = "middle";
      }else{
           this.passwordStatuClass = "weak";
      }
    },
    registerBtn(){
        getData.register({params:{userName:this.userName,password:this.password,rePassword:this.repassword}})
        .then(res=>{
            console.log(res)
            if(res.data.status == 'success'){
                alert(res.data.msg);
                this.$store.commit('setRegisterUserName',res.data.data);
                console.log(this.$store.state.registerUserName)
                this.$router.push({name:'login'})
            }else{
                this.userV.userNameMsg = res.data.msg
            }
        })

    }
  }
};
</script>
<style lang = 'scss'>
@import "@/assets/css/register/index.scss";
</style>