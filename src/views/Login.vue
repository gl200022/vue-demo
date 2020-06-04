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
  </div>
</template>

<script>
export default {
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
    methods: {
      login() {
        if(this.ruleForm.user === 'test' && this.ruleForm.passwd === '123456'){
          window.sessionStorage.setItem("user", 'test');
          this.$router.push("/main");
        }else{
          alert("账号或密码错误！")
        }
      }
    }
  }
</script>