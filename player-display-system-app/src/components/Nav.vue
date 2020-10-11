<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="transparent"
    text-color="#fff"
  >
    <!-- 个人信息 -->
    <div class="self-header menu-btn">
      <el-popover placement="right" trigger="click">
        <!-- 加载个人信息显示框 -->
        <selfInfo />
        <el-button class="head-btn" slot="reference">
          <img :src="$store.state.userInfo.headImg" alt />
        </el-button>
      </el-popover>
    </div>
    <!-- 首页 -->
    <div class="skill-box menu-btn" @click="changeSkillHandler('/home')">
      <i class="el-icon-data-analysis message-btn" :class="active=='/home'?'btn-active':''"></i>
    </div>
    <!-- 技术统计视图 -->
    <div class="skill-box menu-btn" @click="changeSkillHandler('/skill')">
      <i class="el-icon-aim message-btn" :class="active=='/skill'?'btn-active':''"></i>
    </div>
    <!-- 球队管理 -->
    <div class="skill-box menu-btn" @click="changeSkillHandler('/team')">
      <i class="el-icon-trophy-1 message-btn" :class="active=='/team'?'btn-active':''"></i>
    </div>
    <!-- 占位 -->
    <!-- <div class="skill-box menu-btn" @click="changeSkillHandler('/football')">
      <i class="el-icon-football message-btn" :class="active=='/football'?'btn-active':''"></i>
    </div> -->
    <!-- 留言箱 -->
    <div class="message-box menu-btn">
      <el-popover placement="right" trigger="click">
        <Message />
        <el-button class="message-btn" slot="reference">
          <el-badge :value="12" class="item">
            <i class="el-icon-chat-dot-square"></i>
          </el-badge>
        </el-button>
      </el-popover>
    </div>
  </el-menu>
</template>

<script>
// 显示个人信息
import selfInfo from "./selfInfo";
import Message from "./Message";

export default {
  data() {
    return {
      isCollapse: true,
      active: "/home"
    };
  },
  components: {
    selfInfo,
    Message
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 改变路由
    changeSkillHandler(routerName) {
      if (this.$route.path == routerName) return;
      this.active = routerName;
      this.$router.replace(routerName);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  float: right;
  .menu-btn {
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
    .head-btn {
      padding: 0;
      background-color: transparent;
      border: none;
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .message-btn {
      padding: 0;
      background-color: transparent;
      border: none;
      font-size: 30px;
      color: #fff;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    }
    .btn-active {
      color: orange;
    }
  }
  .el-menu-item i {
    color: #fff;
    font-size: 30px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border: none;
}
</style>