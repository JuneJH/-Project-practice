<template>
  <div class="team-container">
    <el-row class="show-team">
      <el-col :span="24">
        <mShowTeam />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="show-list">
        <mShowTeamList />
      </el-col>
       <el-col :span="12">
        <mShowTeamDetail />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mShowTeam from "../components/team/ShowTeam";
import mShowTeamList from "../components/team/TeamList";
import mShowTeamDetail from "../components/team/TeamDetail";
export default {
  components: {
    mShowTeam,
    mShowTeamList,
    mShowTeamDetail
  },
  data(){
      return {
          
      }
  }
};
</script>
<style lang="scss" scoped>
.team-container{
    .show-team{
        padding: 20px 0;
    }
}

</style>