<template>
  <div class="alarm">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Alarm',
  components: {
    HelloWorld
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>
