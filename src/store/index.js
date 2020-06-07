import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tagList: [],        //tag—view中的路由
        curTag: '',         //当前页
        cacheRoutes: ''     //缓存的路由名称
    },
    mutations: {
        //添加缓存页面 添加前先判断是否存在该标签
        addTag(state, obj) {
            let isTrue = state.tagList.some((cur, index, arr) => {
                return cur['name'] && cur['name'] === obj['name'];//避免重复添加
            })
            if (isTrue) return;
            this.state.tagList.push({
                name: obj.name,  //名称
                path: obj.path,    //路径
                type: 'info',
                keepAlive: obj.keepAlive,
                componentName: obj.componentName
            })
            //console.log(this.state.tagList);
            //判断是否需要缓存
            // let cache = state.tagList.filter((item, index, arr) => {
            //     //判断条件 返回与该标签name不同的对象
            //     if (item.keepAlive) {
            //         return item;
            //     }
            // })
            //console.log('tagList', state.tagList);
            let temp = [];
            state.tagList.forEach(item => {
                if(item.keepAlive){
                    temp.push(item.componentName);
                }
            })
            this.state.cacheRoutes = temp.join(',');
        },
        //清除页面缓存
        removeTag: function (state, obj) {
            let tagList = state.tagList.filter((cur, index, arr) => {
                //判断条件 返回与该标签name不同的对象
                if (cur['path'] && cur['path'] !== obj['path']) {
                    return cur;
                }
            })
            //删掉其中某个标签则跳转到taglist中最后一个标签即最右侧标签
            if (tagList.length !== state.tagList.length) {//删除成功
                this.state.tagList = tagList;
                if (tagList.length > 0) {
                    //存在多的tagview情况下
                    let len = tagList.length;
                    this.state.curTag = tagList[len-1].name;
                }
            }
            let temp = [];
            state.tagList.forEach(item => {
                if(item.keepAlive){
                    temp.push(item.componentName);
                }
            })
            this.state.cacheRoutes = temp.join(',');
        },
        //设置当前页
        setCurPage(state, name) {
            //console.log(name)
            this.state.curTag = name;
        },
        //清空tagview
        clearAllTagList(state) {
            state.tagList = [];
        }
    },
    actions: {},
    modules: {}
})
