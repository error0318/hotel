<template>
    <div>
        <el-form :model="passform" ref="passform">
            <el-form-item label="旧密码">
                <el-input v-model="passform.oldpass" placeholder="请输入原来密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="passform.newpass" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="passform.newpassagain" placeholder="请再次确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {URL, SUCCESS} from "@/lib/base";

    export default {
        name: "ChangePass",
        data() {
            return {
                passform:{
                    oldpass: '',
                    newpass: '',
                    newpassagain: '',
                }
            }
        },
        methods: {
            handleSubmit() {
                SUCCESS, URL
                let url = URL + '/admin/login/changePass';
                let token = sessionStorage.getItem('token');
                this.$http({
                    method: 'POST',
                    url: url,
                    data: this.passform,
                    headers: {
                        token
                    }
                }).then(res=>{
                    if(res.status === 200 && res.data.code === SUCCESS) {
                        this.$message.success(res.data.msg);
                        sessionStorage.clear();
                        this.$router.push('/login');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(()=>{

                })
            }
        }
    }
</script>

<style scoped>

</style>