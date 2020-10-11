<template>
  <div class="message-container">
    <h3>讨论区，请文明发言</h3>
    <div class="content">
      <Content :messageList="messageList" ref="messageList" />
    </div>
    <div class="send-content-arae">
      <textarea v-model="sendConten" class="send-area" @keyup.enter="sendMessageHandle"></textarea>
      <div class="btn-container">
        <el-button type="primary" class="send-btn" @click="sendMessageHandle">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Content from "./message/content";
import api from "../services/api";
import baseUrl from "../services/baseurl";
export default {
  components: {
    Content
  },
  data() {
    return {
      sendConten: "",
      messageList: []
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    //请求消息
    getMessage() {
      const uid = this.$store.state.userInfo.uid;
      api.getAllUnreadMessage({ params: { uid: 202000 } }).then(data => {
        if (data.data.status == 1) {
          const messageList = JSON.parse(data.data.content);
          this.messageList = messageList;
          this.$nextTick(() => {
            this.$refs.messageList.$refs.content.scrollTop = this.$refs.messageList.$refs.content.scrollHeight
          });
        }
      });
    },
    sendMessageHandle() {
      const uid = this.$store.state.userInfo.uid;
      const params = { uid: 202000, msendid: uid, mcontent: this.sendConten };
      this.messageList.push(params);
      this.sendConten = "";
      api
        .sendMessageTo({
          params
        })
        .then(data => {
          this.getMessage();
        });
    }
  }
};
</script>
<style lang="scss">
.message-container {
  width: 450px;
  height: 550px;
  h3 {
    font-size: 16px;
    height: 30px;
    line-height: 1;
  }
  .content {
    height: 380px;
    width: 100%;
    background-color: #eee;
  }
  .send-content-arae {
    height: 120px;
    padding-top: 15px;
    padding-right: 10px;
    .send-area {
      width: 100%;
      height: 70px;
      resize: none;
      font-size: 16px;
      color: #333;
      font-weight: 500;
      line-height: 1.5;
      padding: 5px;
      border-color: #ddd;
    }
    .btn-container {
      text-align: right;
      width: 100%;
      margin-left: 10px;
      .send-btn {
        background-color: rgb(19, 111, 231);
        border-color: rgb(19, 111, 231);
      }
    }
  }
}
</style>