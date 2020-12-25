<template>
  <div id="login">
    <p>
      <label for="loginId"> 账 号 </label>
      <input type="text" id="loginId" v-model="loginId"/>
    </p>
    <p>
      <label for="loginPWd"> 密 码 </label>
      <input type="password" id="loginPWd" v-model="loginPwd"/>
    </p>
    <p>
      <button @click="goToLogin"> 登 录</button>
    </p>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
  name: "login",
  setup() {
    const loginIdRef = ref('admin');
    const loginPwdRef = ref('admin123');
    const store = useStore();
    // 登录
    const goToLogin = async () => {
      await store.dispatch('userModule/login', {loginId: loginIdRef.value, loginPwd: loginPwdRef.value})
      await store.dispatch('userModule/whoAmI')
    }
    return {
      loginId: loginIdRef,
      loginPwd: loginPwdRef,
      goToLogin,
    }
  }
}
</script>

<style scoped>

</style>
