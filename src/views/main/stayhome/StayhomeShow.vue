<template>
    <div>
        <loading :isshow="isShow"></loading>
        <el-form inline :model="search">
            <el-form-item label="所属分类">

            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿城市">
                <el-input v-model="search.scity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="warning">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="stayhome">
            <el-table-column label="ID" prop="sid"></el-table-column>
            <el-table-column label="名称" prop="sname"></el-table-column>
            <el-table-column label="描述" prop="sdesc"></el-table-column>
            <el-table-column label="价格" prop="sprice"></el-table-column>
            <el-table-column label="标签" prop="stag">
                <template slot-scope="scope">
                    <el-button v-for="item in scope.row.stag" :key="item">{{item}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="位置">
                <template slot-scope="{row}">
                   <span>{{row.sprovince}}--{{row.scity}}--{{row.sarea}}</span>
                </template>
            </el-table-column>
            <el-table-column label="缩略图" prop="sthumb">
                <template slot-scope="scope">
                    <img :src="scope.row.sthumb">
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="stime">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text">
                        <router-link :to="{name:'stayhomeEdit', params: {id:scope.row.sid}}">编辑</router-link>
                    </el-button>
                </template>

                <el-button>删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import instance from "@/http/http";
    import loading from "@/components/loading/loading";
    import {IMGURL} from "@/lib/base";
    import {categoryShow} from "@/http/category";

    export default {
        name: "StayhomeShow",
        data() {
            return {
                categories:[],
                isShow: false,
                search: {sname: '', scity: '', cid: ''},
                paginate: {limit:5, page: 1},
                stayhome: [],
                total: '',
            }
        },
        methods: {
            initStayhome() {
                this.isShow = true;
                let params = Object.assign({}, this.search, this.paginate);
                instance.get('/api/stayhome', {
                    params: params,
                }).then(res=>{
                    this.isShow = false;
                    if(res.data) {
                        let data = res.data;
                        data = data.map(ele=>{
                            ele.stag = ele.stag.split(/,|，/);
                            ele.sthumb = IMGURL + '/' + ele.sthumb;
                            let date = new Date(ele.stime*1000);
                            ele.stime = [date.getFullYear(), date.getMonth()+1,date.getDate()].join('-');
                            return ele;
                        })
                        this.stayhome = data;
                        this.total = res.total;
                    } else {
                        this.$message.warning('暂无数据');
                    }
                }).catch(()=>{

                })
            },
            initCategory() {
                this.isShow = true;
                categoryShow().then(res=>{
                    this.categories = res.data;
                    console.log(res.data);
                }).catch(()=>{

                })
            }
        },
        components:{
            loading
        },
        filters: {
            myfilter(value) {
                return value;
            }
        },
        mounted() {
            this.initCategory();
            this.initStayhome();
        }
    }
</script>

<style scoped>

</style>