<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!--<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      input: '',
      count: 0
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  }
}
</script>
