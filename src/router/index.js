import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '@/views/Login'
import ChangePass from '@/views/main/pass/ChangePass'
import Main from '@/views/main/Main'
import List from '@/views/main/List'
import CategoryAdd from '@/views/main/category/Add'
import CategoryShow from '@/views/main/category/Show'
import CategoryEdit from '@/views/main/category/CategoryEdit'
import StayhomeAdd from '@/views/main/stayhome/StayhomeAdd'
import StayhomeShow from '@/views/main/stayhome/StayhomeShow'
import StayhomeEdit from '@/views/main/stayhome/StayhomeEdit'
import Echartscom from '@/views/main/echarts/Echarts'
const router = new VueRouter({
    routes: [
        {   path: '/', component: Main, name: 'index',
            redirect: '/echarts',
            meta:{
                auth: true, title: '首页'
            },
            children:[
                {
                    path: 'changepass', component: ChangePass, name:'changepass',
                    meta: {
                        title: '修改密码',
                        auth: true,
                    },
                },
                {
                    path: 'categoryadd', component: CategoryAdd, name:'categoryadd',
                    meta: {
                        title: '分类添加',
                        auth: true,
                    },
                },
                {
                    path: 'categoryshow', component: CategoryShow, name:'categoryshow',
                    meta: {
                        title: '分类查看',
                        auth: true,
                    },
                },
                {
                    path: 'categoryedit', component: CategoryEdit, name:'categoryedit',
                    meta: {
                        title: '分类编辑',
                        auth: true,
                    },
                },
                {
                    path: 'stayhomeAdd', component: StayhomeAdd, name:'stayhomeAdd',
                    meta: {
                        title: '民宿添加',
                        auth: true,
                    },
                },
                {
                    path: 'stayhomeShow', component: StayhomeShow, name:'stayhomeShow',
                    meta: {
                        title: '民宿查看',
                        auth: true,
                    },
                },
                {
                    path: 'stayhomeEdit/:id', component: StayhomeEdit, name:'stayhomeEdit',
                    meta: {
                        title: '民宿编辑',
                        auth: true,
                    },
                },
                {
                    path: 'echarts', component: Echartscom, name:'echarts',
                    meta: {
                        title: '数据可视化',
                        auth: true,
                    },
                },
            ],
        },
        { path: '/login', component: Login, name: 'login',
            meta:{
                auth: false, title: '登录'
            }
        },
        { path: '/list', component: List, name: 'list',
            meta:{
                auth: true, title: '列表'
            }
        },
    ]
})
router.beforeEach( (to, from, next) => {
    let title = to.meta.title || '民宿后台';
    document.title = title;
    if(to.meta.auth) {
        let token = sessionStorage.getItem('token');
        token = token && token.trim();
        if(token) {
            next();
        } else {
            next({name: 'login', query:{redirect:to.name}});
        }
    } else {
        next();
    }
})
export default router;