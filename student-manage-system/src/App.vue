<template>
  <div id="app">
    <div class="header-app">
      <Header />
    </div>
    <div class="left-app">
      <Left />
    </div>
    <div class="right-app">
      <router-view></router-view>
       <!-- <Right/> -->
    </div>
  </div>
</template>
<script>
import Header from "./components/header";
import Left from "./components/left";
import Right from "./components/right";
import "./assets/reset.css";
export default {
  components: {
    Header,
    Left,
    Right
  }
};
</script>

<style>
#app{
  position: fixed;
  width:100%;
  height: 100%;
  left:0;
  top:0;
}
.left-app {
  height: calc(100% - 70px);
  float: left;
  width:200px;
}
.right-app{
  width:calc(100% - 200px);
  /* background-color: red; */
  float: left;
  overflow: hidden;
}
.router-link-exact-active{ 
  background-color:antiquewhite;
  color:#000;
}
</style>
