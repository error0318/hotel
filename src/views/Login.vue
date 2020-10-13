<template>
    <div class="login" ref="login">
        <div class="login-content">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密 码" prop="password">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL} from "../lib/base";

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 5, max: 18, message: '用户名长度在 5 到 18 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(validate => {
                    if (validate) {
                        axios.post(URL + '/admin/Login/check', this.loginForm).then((res) =>{
                            if(res.status === 200 && res.data.code === 200) {
                                let redirect = this.$route.query.redirect || 'index';
                                sessionStorage.setItem('token', res.data.token);
                                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                                this.$router.push({name:redirect});
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(function (err) {
                            console.log(err);
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: cornsilk;
    }

    .login > .login-content {
        width: 400px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        border-radius: 25px;
        background: aqua;
    }
</style>