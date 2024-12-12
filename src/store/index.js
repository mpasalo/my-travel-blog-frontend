import { createStore } from 'vuex'
import Swal from 'sweetalert2';
import api from './../api'
import axios from 'axios'
import router from '../router'
import { logIn, checkAuthentication } from '../userFunctions'
import * as types from './mutation-types'

// Create a new store instance.
export default createStore({
    state () {
        return {
            isAuthenticated: false,
            token: null,
            user: [],
            name: "",
            email: "",
            password: "",
            posts: {},
            post: {}
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        posts(state) {
            return state.posts;
        },
        post(state) {
            return state.post;
        }
    },
    mutations: {
        [types.USER](state, payload) {
            state.user = payload;
        },
        [types.POSTS](state, payload) {
            state.posts = payload;
        },
        [types.POST](state, payload) {
            state.post = payload;
        }
    },
    actions:{
        registerUser({ commit }, data) {
            axios.post(import.meta.env.VITE_APP_URL + `/api/user/create`, data.formData).then(response => {
                if (response.data.message) {
                    var arr = [].concat.apply([], [ 
                            response.data.message.name,
                            response.data.message.email,
                            response.data.message.password,
                    ]);

                    let error_fields = arr.filter(function(e) {
                        if (e) {
                            return e;
                        } else {
                            return null;
                        }
                    });
                    Swal.fire({
                        title: "Sign Up Error",
                        html: error_fields,
                        icon: "error",
                        confirmButtonText: "Close"
                    });                  
                } else {                
                    logIn(this.state.email, this.state.password).then(
                        (response) => {
                            localStorage.setItem("userId", response.data.id);
                            localStorage.setItem("token", response.data.token);
                            checkAuthentication();
                            router.push({ path: '/posts' }); 
                        }
                    )              
                }
            });
        },

        getPosts({ commit }) {
            api().get(`posts`).then(response => {
                commit("POSTS", response.data);
            });
        },

        getPost({ commit }, postId) {
            api().get(`posts/${postId}`).then(response => {
                commit("POST", response.data);
            });
        },

        savePost({ commit }, data) {
            api().post(`posts`, data.formData).then(response => {
                if (response.data.message) {
                    var arr = [].concat.apply([], [ 
                            response.data.message.title,
                            response.data.message.body,
                    ]);

                    let error_fields = arr.filter(function(e) {
                        if (e) {
                            return e;
                        } else {
                            return null;
                        }
                    });
                    Swal.fire({
                        title: "Create Post Error",
                        html: error_fields,
                        icon: "error",
                        confirmButtonText: "Close"
                    });                  
                } else {                
                    Swal.fire({
                        title: "Post",
                        html: "Successfully Created Post",
                        icon: "success",
                        confirmButtonText: "Go Back To Posts"
                    }).then(response => {
                        router.push({ path: '/posts' });
                    });                
                }
            });
        },

        editPost({ commit }, data) {
            api().put(`posts/${data.id}`, data.formData).then(response => {
                if (response.data.message) {
                    var arr = [].concat.apply([], [ 
                            response.data.message.title,
                            response.data.message.body,
                    ]);

                    let error_fields = arr.filter(function(e) {
                        if (e) {
                            return e;
                        } else {
                            return null;
                        }
                    });
                    Swal.fire({
                        title: "Edit Post Error",
                        html: error_fields,
                        icon: "error",
                        confirmButtonText: "Close"
                    });                  
                } else {                
                    Swal.fire({
                        title: "Post",
                        html: "Successfully Updated Post",
                        icon: "success",
                        confirmButtonText: "Go Back To Posts"
                    }).then(response => {
                        router.push({ path: '/posts' });
                    });                
                }
            });
        },

        deletePost({ commit }, id) {
            api().delete(`posts/${id}`).then(response => {
                if (response.data.message) {
                    var arr = [].concat.apply([], [ 
                        response.data.message,
                    ]);

                    let error_fields = arr.filter(function(e) {
                        if (e) {
                            return e;
                        } else {
                            return null;
                        }
                    });
                    Swal.fire({
                        title: "Delete Post Error",
                        html: error_fields,
                        icon: "error",
                        confirmButtonText: "Close"
                    });                  
                } else {  
                    this.dispatch("getPosts");              
                    Swal.fire({
                        title: "Post",
                        html: "Successfully Delete Post",
                        icon: "success",
                        confirmButtonText: "Close"
                    });                
                }
            });
        },

    }
});