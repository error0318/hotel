<template>
    <div>
        <loading :isshow="showLoading"></loading>
        <div>
        <el-form :model="stayhomeform" ref="stayhomeform">
            <el-form-item label="所属分类">
                <el-select v-model="stayhomeform.cid" placeholder="请选择">
                    <el-option
                            v-for="item in categories"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="stayhomeform.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿描述">
                <el-input v-model="stayhomeform.sdesc"></el-input>
            </el-form-item>
            <el-form-item label="民宿标签">
                <el-input v-model="stayhomeform.stag"></el-input>
            </el-form-item>
            <el-form-item label="民宿评分">
                <el-input v-model="stayhomeform.score"></el-input>
            </el-form-item>
            <el-form-item label="民宿价格">
                <el-input v-model="stayhomeform.sprice"></el-input>
            </el-form-item>
            <el-form-item label="民宿省份">
                <el-select v-model="stayhomeform.sprovince">
                    <el-option v-for="(item, index) in province" :value="item" :label="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿城市">
                <el-select v-model="stayhomeform.scity">
                    <el-option v-for="(item, index) in cityList" :value="item" :label="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿区域">
                <el-select v-model="stayhomeform.sarea">
                    <el-option v-for="(item, index) in areaList" :value="item" :label="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿地址">
                <el-input v-model="stayhomeform.saddress"></el-input>
            </el-form-item>
            <el-form-item label="民宿缩略图">
            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        :show-file-list="false"
                        :on-success="handleThumbSuccess"
                        :before-upload="handleThumbBeforeUpload">
                    <img v-if="stayhomeform.sthumb" :src="IMGURL+ stayhomeform.sthumb" class="avatar"/>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb，最佳比例1:1</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="民宿轮播">

            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :file-list="bannerFileList"
                        :on-success="handleBannerSuccess"
                        :on-remove="handleBannerRemove"
                        :on-preview="handleBannerPreview"
                        :on-exceed="handleExceed">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb，最佳比例1:1,最多上传5张</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="民宿详情">
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item>
                <rich-text :menus="['head']" :value="stayhomeform.sdetail" @rich-change="setSnotice" formfield="snotice"></rich-text>
            </el-form-item>
            <el-form-item label="入住须知">
            </el-form-item>
            <el-form-item>
                <rich-text :menus="['head']" :value="stayhomeform.snotice" @rich-change="setSnotice" formfield="snotice"></rich-text>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogPreviewImg" alt="">
        </el-dialog>
        </div>
    </div>
</template>

<script>
    import {SUCCESS, URL, IMGURL} from "@/lib/base";
    import loading from "@/components/loading/loading";
    import instance from "@/http/http";
    import RichText from "@/components/rich-text/RichText";
    import E from 'wangeditor';
    import city from '@/lib/city.json'
    import {stayhomeRead} from "@/http/stayhome";

    export default {
        name: "StayhomeAdd",
        components: {
            loading,
            RichText
        },
        data() {
            return {
                IMGURL,
                uploadurl: URL+'/admin/upload/index',
                showLoading: false,
                categories: [],
                stayhomeform: null,
                bannerFileList: [],
                bannerArr: [],
                dialogVisible: false,
                dialogPreviewImg: '',
                city: city,
                province: [],
            }
        },
        methods:{
            initStayhome(sid) {
                stayhomeRead(sid).then(res=>{
                    console.log(res.data);
                    if(res.data) {
                        this.stayhomeform = res.data;
                        this.bannerArr = res.data.sbanner1;
                        this.bannerFileList = res.data.sbanner1.map(ele=>({name:res.data.sname, url: this.IMGURL+ ele}))
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            initCategory() {
                this.showLoading = true;
                instance.get('/admin/category/show').then(res=>{
                    this.showLoading = false;
                    if(res.code === SUCCESS) {
                        console.log(res.data);
                        this.categories = res.data;
                    }
                }).catch(()=>{

                })
            },
            handleThumbSuccess(res) {
                if(res.code === SUCCESS) {
                    this.stayhomeform.sthumb = res.imgpath;
                }
            },
            handleThumbBeforeUpload(file) {
                let {size, type} = file;
                let uploadMaxSize = 200 * 1024;
                let uploadType = ['image/jpg', 'image/png','image/jpeg','image/webp'];
                let sizeFlag = true, typeFlag = true;
                sizeFlag = size < uploadMaxSize;
                typeFlag = uploadType.some(ele=>ele==type);
                if (!typeFlag) {
                    this.$message.error('上传头像图片只能是 JPG, PNG, WEBP 格式!');
                }
                if (!sizeFlag) {
                    this.$message.error('上传头像图片大小不能超过 500k!');
                }
                return sizeFlag && typeFlag;
            },
            handleBannerSuccess(res) {
                this.bannerArr.push(res.imgpath);
                this.stayhomeform.sbanner = this.bannerArr.join(',');
            },
            handleBannerRemove(file) {
                let url = file.response ? file.response.imgpath : file.url;
                this.bannerArr = this.bannerArr.filter(ele=> !url.includes(ele));
                this.stayhomeform.sbanner = this.bannerArr.join(',');
            },
            handleBannerPreview(file) {
                this.dialogVisible = true;
                let url;
                if(file.response) {
                    url = this.IMGURL + file.response.imgpath;

                } else {
                    url = file.url;
                }
                this.dialogPreviewImg = url;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            initRichText() {
                let that = this;
                let edit = new E(this.$refs.sdetail);
                edit.customConfig.showLinkImg = false;
                edit.customConfig.uploadImgServer = this.uploadurl;
                edit.customConfig.uploadFileName = 'file';
                edit.customConfig.onchange = (html) => {
                    this.stayhomeform.sdetail = html;
                };
                edit.customConfig.uploadImgHooks = {
                    customInsert: function (insertImg, result) {
                        insertImg(that.IMGURL + result.imgpath);
                    }
                }
                edit.create();
            },
            setSnotice(field, html) {
                this.stayhomeform[field] = html;
            },
            setProvince() {
                this.province = this.city.map(ele=>ele.name);
            },
        },
        computed:{
            cityList() {
                let cityList = [];
                let province = this.city.find(ele=>ele.name === this.stayhomeform.sprovince);
                if(province){
                    cityList = province.city.map(ele=>ele.name);
                }
                return cityList;
            },
            areaList() {
                let area = [];
                let province = this.city.find(ele=>ele.name === this.stayhomeform.sprovince);
                if(province){
                    let citys = province.city.find(ele=>ele.name === this.stayhomeform.scity);
                    if(citys) {
                        area = citys.area;
                    }
                }
                return area;
            }
        },
        mounted() {
            let id = this.$route.params.id;
            this.initStayhome(id);
            this.setProvince();
            this.initCategory();
            this.initRichText();
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>