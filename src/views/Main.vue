<template>
    <el-container>
        <el-header height="12%">Header</el-header>
        <el-container style="height: 80%;">
            <el-aside width="20%">
                <el-row width="100%" style="height: 100%;">
                    <el-col :span="24" style="height: 100%;">
                        <el-menu
                                :default-active="this.$route.path"
                                router mode="horizontal"
                                class="el-menu-vertical-demo"
                                :collapse="isCollapse"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#ffd04b"
                                style="height: 100%;">
                            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name"
                                          style="width: 100%;padding-right: 50%">
                                <template slot="title">
                                    <i class="el-icon-s-platform"></i>
                                    <span> {{ item.navItem }}</span>
                                </template>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header style="height: 6%;text-align: left;padding: 0;background-color: white">
                    <!--todo 菜单折叠收缩-->
                    <!--<el-button type="info" icon="el-icon-menu" @click="changeCollapse"></el-button>-->
                    <el-tag
                            v-for="tag in $store.state.tagList"
                            :key="tag.name"
                            closable
                            :type="tag.type"
                            effect="plain"
                            :disable-transitions="true"
                            @close="closeTag(tag)"
                            @click="changeTag(tag)"
                            :class="{clickBgs: $store.state.curTag === tag.name}">
                        {{tag.name}}
                    </el-tag>
                </el-header>
                <el-main>
                    <!--第一次点击菜单是是不在菜单里面的，所以不会缓存，点击后根据keepalive
                            值判断是否需要将其添加到cacheRoutes，关闭时在移除即可-->
                    <keep-alive :include="$store.state.cacheRoutes">
                        <router-view/>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>


<script>
    export default {
        name: 'Main',
        data() {
            return {
                navList: [
                    {name: '/components/Home', navItem: '首页'},
                    {name: '/components/Management', navItem: '权限管理'},
                    {name: '/components/User', navItem: '用户管理'},
                    {name: '/components/Personnel', navItem: '人员数据'},
                    {name: '/components/Alarm', navItem: '报警中心'}
                ],
                //静态tags
                /*dynamicTags: [
                    {type: 'info', label: '标签一'},
                    {type: 'info', label: '标签二'},
                    {type: 'info', label: '标签三'},
                    {type: 'info', label: '标签四'}
                ],*/
                inputnputVisible: false,
                inputValue: '',
                isCollapse: false
            }
        },
        methods: {
            changeCollapse() {
                console.log(this.isCollapse);
                this.isCollapse = (!this.isCollapse);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            closeTag(tag) {
                this.$store.commit('removeTag', tag);
                let len = this.$store.state.tagList.length;
                this.$router.push(this.$store.state.tagList[len-1].path);
            },
            changeTag(tag) {
                this.$store.commit('setCurPage', tag.name);
                this.$router.push(tag.path);
            },
            handleClose(tag) {
                this.$store.commit('removeTag', tag);
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

<style>
    html, body, #app, .el-container {
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
        /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }

</style>

<style>
    .el-tag + .el-tag {
        margin-left: 4px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-menu.el-menu--horizontal {
        border-bottom: solid 0 #e6e6e6;
    }

    .el-tag.clickBgs {
        /*重点 核心  :class="{clickBgs:tag.label==showWhite}"*/
        background: #42b983;
        color: white;
    }

    .el-tag--plain.el-tag--info .el-tag__close {
        color: #1d538a;
    }
</style>