import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

router.beforeEach(async (to, from) => {
    if (
      // make sure the user is authenticated
      !store.state.isAuthenticated &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'login' && to.name !== 'register' && to.name !== 'home'
    ) {
      // redirect the user to the login page
      return { name: 'login' }
    }
})

createApp(App)
.use(router)
.use(store)
.mount('#app')
