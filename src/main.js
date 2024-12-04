import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import HomeComponent from './components/HomeComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', name: 'home', component: HomeComponent },
        { path: '/login', name: 'login', component: LoginComponent },
        { path: '/register', name: 'register', component: RegisterComponent }
    ]
})

createApp(App)
.use(router)
.mount('#app')
