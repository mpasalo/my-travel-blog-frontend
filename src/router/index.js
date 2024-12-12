import { createWebHistory, createRouter } from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import IndexPostComponent from '../components/IndexPostComponent.vue'
import CreatePostComponent from '../components/CreatePostComponent.vue'
import PostComponent from '../components/PostComponent.vue'


export default createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', name: 'home', component: HomeComponent },
        { path: '/login', name: 'login', component: LoginComponent },
        { path: '/register', name: 'register', component: RegisterComponent },
        { path: '/posts', name: 'indexPosts', component: IndexPostComponent },
        { path: '/create-post', name: 'createPosts', component: CreatePostComponent },
        { path: '/posts/:id', name: 'post', component: PostComponent },
    ]
});