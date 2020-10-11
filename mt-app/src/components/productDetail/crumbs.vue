<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.topBarPosition}}美团</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'goods',params:{name:$route.params.name} }">{{$store.state.topBarPostion}}{{$route.params.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>