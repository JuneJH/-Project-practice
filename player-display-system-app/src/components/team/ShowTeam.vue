<template>
  <div class="show-team-container">
    <el-carousel :interval="4000" type="card" height="450px" indicator-position="none">
      <el-carousel-item v-for="(item,index) in teamList" :key="index">
        <mCard :team="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import mCard from "./TeamItem";
import api from "../../services/api";
export default {
  data() {
    return {
      teamList: []
    };
  },
  created() {
    this.getAllTeam();
  },
  methods: {
    getAllTeam() {
      const uid = this.$store.state.userInfo.uid;
      api.getAllTeam({ params: { uid } }).then(data => {
        this.teamList = JSON.parse(data.data.content);
        this.teamList.tplayerlist = this.teamList.tplayerlist ?  JSON.parse(this.teamList.tplayerlist) : []
        if (this.teamList == null || this.teamList.length == 0) {
          this.teamList = false;
        }
      });
    }
  },
  components: {
    mCard
  }
};
</script>

<style>
</style>