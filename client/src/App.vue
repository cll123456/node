<template>
  <div id="nav">
    <router-link to="/">Go to Home</router-link>
    |
    <router-link to="/protect">protect</router-link>
    |
    <a v-if="data">{{ data.datas.username }} <span @click="loginOut">退出登录</span></a>
    <a v-else-if="isLoading">loading...</a>
    <router-link v-else to="/login">login</router-link>
  </div>
  <router-view></router-view>
</template>

<script>

import {useStore} from "vuex";
import {computed} from "vue";
import {useRouter} from "vue-router";

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();

    const loginOut = () => {
      store.dispatch('userModule/loginOut');
      router.push('/login')
    }
    return {
      isLoading: computed(() => store.state.userModule.isLoading),
      data: computed(() => store.state.userModule.data),
      loginOut,
    }
  }
}
</script>
<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
