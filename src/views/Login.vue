<template>
  <div class="loginbody">
      <el-form v-model="ruleForm"  status-icon  :rules="rules">
        <!-- 用户名 -->
        <el-form-item>
          <el-input v-model="ruleForm.user" prefix-icon="el-icon-user" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="">
          <el-input type="password" v-model="ruleForm.passwd" prefix-icon="el-icon-lock" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click.enter="login()" >登&nbsp;录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() { // 页面的初始数据
      return {
        ruleForm: { // 存储用户输入数据
          user: '',
          passwd: '',
        },
        rules: { // 可添加一些表单规则
        }
      }
    },
  created() {
    // 进入前先清除所有tag
    this.$store.commit('clearAllTagList');
  },
  methods: {
      login() {
        let params = {userName: this.ruleForm.user, password: this.ruleForm.passwd};
        this.$axios({
          url: "/login",
          method: "post",
          params: params
        }).then(res => {
          if(res.data.isLogin){
            window.sessionStorage.setItem("user", 'test');
            this.$router.push("/components/Home");
          }else{
            alert("账号或密码错误！")
          }
        })
      }
    }
  }
</script>
