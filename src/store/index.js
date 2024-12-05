import { createStore } from 'vuex'
import Swal from 'sweetalert2';
import api from './../api'
import axios from 'axios'
import router from '../router'
import { logIn } from '../userFunctions'

// Create a new store instance.
export default createStore({
    state () {
        return {
            isAuthenticated: true,
            token: null,
            name: "",
            email: "",
            password: "",
        }
    },
    mutations: {},
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
                            this.state.isAuthenticated =  true;
                            this.state.token = response.data.token;

                            localStorage.setItem("token", response.data.token);
                        }
                    )
                    router.push({ path: '/posts' });
                }
            });
        },
    }
});