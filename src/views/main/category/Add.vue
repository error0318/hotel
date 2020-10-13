<template>
    <div>
        <el-form :model="category" :rules="categoryRules" ref="categoryform">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="category.cname" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="cdesc">
                <el-input v-model="category.cdesc" placeholder="请输入分类描述"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handlerSubmit">提交</el-button>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL, SUCCESS} from '@/lib/base'
    export default {
        name: "Add.vue",
        data() {
            let validateCname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类名称不能为空'));
                } else if (!(/[\u4e00-\u9fa5]{2,6}/.test(value))) {
                    callback(new Error('分类名称为2-6位汉字'));
                } else {
                    callback();
                }
            }
            return {
                category: {
                    cname: '',
                    cdesc: '',
                },
                categoryRules: {
                    cname: [
                        {validator: validateCname, trigger: 'blur'},
                    ],
                    cdesc: [
                        {required: true, message: '请输入分类描述', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度3-20个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        methods:{
            handlerSubmit() {
                this.$refs.categoryform.validate(valid=>{
                    if(valid) {
                        let url = URL+'/admin/category/add';
                        let token = sessionStorage.getItem('token');
                        axios({
                            url: url,
                            method: 'POST',
                            data: this.category,
                            token: token,
                        }).then(res=>{
                            if(res.status === 200 && res.data.code === SUCCESS) {
                                this.$message.success(res.data.msg);
                            }
                        }).catch(()=>{
                            this.$message.error('分类添加失败了哦');
                        })
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>