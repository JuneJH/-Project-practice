<template>
    <div class="left">
        <ul>
            <router-link tag="li" to="/studentList" >学生列表</router-link>
            <router-link tag="li" to='./addform'>新增学生 </router-link>
        </ul>
    </div>
</template>
<style>
    .left{
        width:100%;
        height: 100%;
        background-color:#1ae7e7;
    }
    ul li{
        text-align: center;
        padding:10px 0;
        cursor:pointer;
        font-size: 16px;
    }

</style>