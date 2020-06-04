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
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  style="height: 100%;">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="width: 100%;padding-right: 50%">
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
            <el-tag
              :key="tag.label"
              v-for="tag in dynamicTags"
              closable
              :type="tag.type"
              effect="plain"
              :disable-transitions="true"
              @close="handleClose(tag)"
              @click="changeClass(tag)"
              :class="{clickBgs:tag.label==showWhite}">
              {{tag.label}}
            </el-tag>
          </el-header>
    <el-main>
      <!-- <keep-alive>
        <router-view/>
      </keep-alive> -->
      <router-view/>
    </el-main>
  </el-container>

      </el-container>
    </el-container>
</template>


<script>
  export default {
    data() { 
        return { 
            navList:[ 
            {name:'/components/ServiceHall',navItem:'服务大厅'}, 
            {name:'/components/Management',navItem:'权限管理'},
            {name:'/components/User',navItem:'用户管理'}, 
            {name:'/components/Personnel',navItem:'人员数据'}, 
            {name:'/components/Alarm',navItem:'报警中心'}
            ],
            dynamicTags: [
              { type: 'info', label: '标签一' },
              { type: 'info', label: '标签二' },
              { type: 'info', label: '标签三' },
              { type: 'info', label: '标签四' }
            ],
            inputnputVisible: false,
            inputValue: '',
            showWhite:-1
        } 
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeClass(tag) {
        this.showWhite = tag.label;
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
  html,body,#app,.el-container{
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
  .el-menu.el-menu--horizontal{
    border-bottom: solid 0 #e6e6e6;
  }
  .el-tag.clickBgs{
    /*重点 核心  :class="{clickBgs:tag.label==showWhite}"*/
    background: #42b983;
    color: white;
  }
  .el-tag--plain.el-tag--info .el-tag__close{
    color: #1d538a;
  }
</style>