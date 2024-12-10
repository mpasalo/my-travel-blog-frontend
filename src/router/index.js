import { createWebHistory, createRouter } from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import PostsComponent from '../components/PostsComponent.vue'
import CreatePostsComponent from '../components/CreatePostsComponent.vue'

export default createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', name: 'home', component: HomeComponent },
        { path: '/login', name: 'login', component: LoginComponent },
        { path: '/register', name: 'register', component: RegisterComponent },
        { path: '/posts', name: 'posts', component: PostsComponent },
        { path: '/create-post', name: 'createPosts', component: CreatePostsComponent },
    ]
});