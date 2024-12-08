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
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        }
    },
    mutations: {
        [types.USER](state, payload) {
            state.user = payload;
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
                            localStorage.setItem("token", response.data.token);
                            checkAuthentication();
                            router.push({ path: '/posts' }); 
                        }
                    )              
                }
            });
        },
    }
});