<template>
    <div class="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
        <div></div>
        <div class="login">
            <h1 class="text-white text-[40px] text-center mb-4"><em>Login</em></h1>

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="form.email">

                <div id="emailHelp" class="form-text text-white">We'll never share your email with anyone else.</div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="form.password">
            </div>

            <button @click="logInUser()" class="btn btn-primary">Submit</button>
        </div>
    </div>
</template>
<script>
import Form from "vform";
import { logIn, checkAuthentication } from "../userFunctions";
import router from '../router'
    export default {
        data() {
            return {
                form: new Form({
                    email: "",
                    password: "",
                })
            };
        },
        methods: {
            logInUser() {
                logIn(this.form.email, this.form.password).then(
                    (response) => {
                        localStorage.setItem("userId", response.data.id);
                        localStorage.setItem("token", response.data.token);
                        checkAuthentication(); 
                        router.push({ path: '/posts' });
                    }
                )
            }
        }
    }
</script>