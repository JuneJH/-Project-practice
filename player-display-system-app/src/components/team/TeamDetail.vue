<template>
  <div class="team-detail">
    <el-row>
      <el-col :span="6">
        <div class="team-title">
          <h3>{{ $store.state.teamTile.title }}</h3>
          <div class="team-descirpt-tip" v-if="!$store.state.teamTile.descript">该球队暂时没有描述</div>

          <div class="team-descirpt">{{ $store.state.teamTile.descript }}</div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="team-player">
          <div class="player-item-tip" v-if="$store.state.teamPlayerList.length == 0">该球队暂时没有任何球员</div>
          <div
            class="player-item"
            v-for="(item,index) in $store.state.teamPlayerList"
            :key="item.id+index"
          >
            <div class="header">
              <img :src="item.url" />
            </div>
            <span>{{ item.id }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.team-detail {
  background-color: rgba(243, 238, 238, 0.2);
  height: 350px;
  margin-left: 20px;
  margin-top: 80px;
  border-radius: 5px;
  h3 {
    text-align: center;
    margin: 30px 0 10px;
    font-size: 20px;
  }
  .team-descirpt-tip {
    color: rgb(219, 212, 212);
    height: 180px;
    line-height: 30px;
    width: 100%;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .team-descirpt {
    padding: 5px;
    height: 120px;
    overflow-y: auto;
    color: #ddd;
    font-size: 12px;
    line-height: 1.5;
  }
  .team-player {
    display: flex;
    margin-top: 5px;
    flex-wrap: wrap;
    height: 210px;
    overflow-y: auto;
    .player-item-tip {
      height: 100%;
      line-height: 200px;
      text-align: center;
      width: 100%;
      font-size: 20px;
      color: rgb(235, 223, 223);
      font-weight: 600;
    }
    .player-item {
      width: 60px;
      height: 60px;
      margin-left: 25px;
      margin-top: 25px;
      text-align: center;
      .header {
        width: 45px;
        height: 45px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      span {
        display: block;
        font-size: 12px;
        margin-top: 5px;
        text-align: center;
        height: 10px;
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>