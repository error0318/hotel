<template>
    <el-container class="main-box">
        <el-header>
            <div class="logo"><img src="../../assets/logo.png"/></div>
            <div class="nav">
                <el-menu mode="horizontal">
                    <el-menu-item index="1">指南</el-menu-item>
                    <el-submenu index="1-1">
                        <template slot="title">
                            admin
                        </template>
                        <el-menu-item><router-link to="changepass">修改密码</router-link></el-menu-item>
                        <el-menu-item>退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-submenu index="1-2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">分类管理</span>
                        </template>
                        <el-menu-item>
                            <router-link to="categoryadd">分类添加</router-link>
                        </el-menu-item>
                        <el-menu-item>
                            <router-link to="categoryshow">分类查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2-1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">民宿管理</span>
                        </template>
                        <el-menu-item>
                            <router-link to="stayhomeAdd">民宿添加</router-link>
                        </el-menu-item>
                        <el-menu-item>
                            <router-link to="stayhomeshow">民宿查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
    .main-box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .el-header {
        display: flex;
        justify-content: space-between;
        background-color: #B3C0D1;
        color: #333;
    }
    .el-header .nav {
        width: 200px;
        height: 100%;
        background-color: #fff;
        
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
</style>