<template>
  <div class="register">
    <div class="register-form">
      <h1>Hi~~</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="ruleForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upassword">
          <el-input type="password" v-model="ruleForm.upassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="球衣号码" prop="unumber">
          <el-input v-model="ruleForm.unumber"></el-input>
        </el-form-item>
        <el-form-item label="所在球队" prop="uteam">
          <el-select v-model="ruleForm.uteam" placeholder="以下不存在，后续可以创建">
            <el-option label="重庆璧山队" value="重庆璧山队"></el-option>
            <el-option label="曼彻斯特城队" value="曼彻斯特城队"></el-option>
            <el-option label="曼彻斯特联队 " value="曼彻斯特联队"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="喜欢的位置" prop="uplace">
          <el-checkbox-group v-model="ruleForm.uplace">
            <el-checkbox label="门将" name="uplace"></el-checkbox>
            <el-checkbox label="左后卫" name="uplace"></el-checkbox>
            <el-checkbox label="中后卫" name="uplace"></el-checkbox>
            <el-checkbox label="右后卫" name="uplace"></el-checkbox>
            <el-checkbox label="后腰" name="uplace"></el-checkbox>
            <el-checkbox label="左前卫" name="uplace"></el-checkbox>
            <el-checkbox label="右前卫" name="uplace"></el-checkbox>
            <el-checkbox label="前腰" name="uplace"></el-checkbox>
            <el-checkbox label="影锋" name="uplace"></el-checkbox>
            <el-checkbox label="左前锋" name="uplace"></el-checkbox>
            <el-checkbox label="右前锋" name="uplace"></el-checkbox>
            <el-checkbox label="中锋" name="uplace"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="身高" prop="uheight">
          <el-input v-model.number="ruleForm.uheight"></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="uweight">
          <el-input v-model.number="ruleForm.uweight"></el-input>
        </el-form-item>
        <el-form-item label="入队时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.utime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="电话号码" prop="uphone">
          <el-input v-model.number="ruleForm.uphone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="uage">
          <el-input v-model.number="ruleForm.uage"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="usex">
          <el-radio-group v-model="ruleForm.usex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "../services/api";
export default {
  data() {
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.upassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "",
        upassword: "",
        unumber: "",
        uteam: "",
        uplace: [],
        uheight: "",
        uweight: "",
        utime: "",
        uphone: "",
        uage: "",
        usex: "",
        headImg: "",
        teamId: "",
        time: "",
        checkPass: ""
      },
      rules: {
        uname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        upassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [
          { validator: checkPass, trigger: "blur" },
          { required: true, message: "请确认密码", trigger: "blur" }
        ],
        // unumber: [{ type: "number", message: "场上号码必须是数字" }],
        uheight: [{ type: "number", message: "身高必须是数字" }],
        uweight: [{ type: "number", message: "体重必须是数字" }],
        uphone: [{ type: "number", message: "电话号码必须是数字" }],
        uage: [{ type: "number", message: "年龄必须是数字" }],
        utime: [
          {
            type: "date",
            required: false,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        time: [
          {
            type: "date",
            required: false,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        uplace: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个场上位置",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const params = this[formName];
      params.utime && (params.utime = params.utime.toLocaleDateString());
      params.usex = params.usex == "男" ? 0:1;
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.register(params).then(resp => {
            this.open(resp.data.content);
          });
        } else {
          this.warn()
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    warn() {
      this.$message({
        message: "请认真填写个人信息，这将关系到系统对你的分析准确性",
        type: "warning"
      });
    },
    open(uid) {
      this.$store.commit("setUid", uid);
      this.$alert(
        "这是你的账号" + uid + "，他将作为你登录的唯一身份凭证",
        "立即去登陆",
        {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push("/");
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  .register-form {
    width: 500px;
    margin: 50px auto;
  }
}
</style>