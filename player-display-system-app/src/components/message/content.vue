<template>
  <ul style="overflow:auto;height:100%" ref="content">
    <li v-for="item in messageList" class="infinite-list-items" :key="item.id">
      <el-row class="self" v-if="item.msendid == $store.state.userInfo.uid ">
        <el-col :span="20" class="message-content-container">
          <div class="message-content">{{ item.mcontent}}</div>
        </el-col>
        <el-col :span="4" >
          <div class="header">
            <img
                           src="http://127.0.0.1:12306/getHeader?path=\headImg\86038ad0a602e91f59f4656a165c5100"

            />
          </div>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="4">
          <div class="header">
            <img
              src="http://127.0.0.1:12306/getHeader?path=\headImg\86038ad0a602e91f59f4656a165c5100"
              alt
            />
          </div>
        </el-col>
        <el-col :span="20" class="message-content-container">
          <div class="message-content">{{ item.mcontent}}</div>
        </el-col>
      </el-row>
    </li>
  </ul>
</template>

<script>
import api from "../../services/api";
import baseUrl from "../../services/baseurl";
export default {
  data() {
    return {
      count: 0,
    };
  },
  props: ["messageList"],

};
</script>
<style lang="scss">
.infinite-list-items {
  margin: 15px 0;
  .self {
    .header {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .message-content-container {
        // background-color: red;
        text-align: right;
        padding-right: 10px;
      .message-content {
        border-radius: 5px;
        padding: 15px 10px;
        display: inline-block;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          border: 10px solid transparent;
          border-left: 20px #fff solid;
          border-radius: 10px;
          right: -20px;
          top: 10px;
          transform: rotateZ(10deg);
        }
        &::after{
            display: none;

        }
      }
    }
  }
  .header {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .message-content-container {
    padding-right: 45px;
    .message-content {
      //   height: 100px;
      background-color: #fff;
      border-radius: 5px;
      padding: 15px 10px;
      display: inline-block;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        border: 10px solid transparent;
        border-right: 20px #fff solid;
        border-radius: 10px;
        left: -20px;
        top: 10px;
        transform: rotateZ(10deg);
      }
    }
  }
}
   ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar-track {
        background-color: #dfdfdf77;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: #b9b9b9;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgb(133, 133, 133);
    }
</style>
