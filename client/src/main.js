import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import {router} from './router'
import store from './store'
store.dispatch('userModule/whoAmI')
createApp(App).use(router).use(store).mount('#app')
