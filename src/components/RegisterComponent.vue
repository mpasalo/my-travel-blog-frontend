<template>
    <div class="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
        <div></div>
        <div class="register text-white">
            <h1 class="text-[40px] text-center mb-4"><em>Register</em></h1>

            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" name="name" id="name"  class="form-control" v-model="form.name">
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" name="email" id="email" class="form-control" v-model="form.email">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" id="password" class="form-control" v-model="form.password">
            </div>
        
            <button @click="registerUser()"  class="btn btn-info">Submit</button>
        </div>
    </div>
</template>
<script>
import Form from "vform";
export default {
    data() {
        return {
            form: new Form({
                name: "",
                email: "",
                password: "",
            })
        };
    },

    methods: {
        registerUser: function() {
            let formData = new FormData();

            formData.append("name", this.form.name);
            formData.append("email", this.form.email);
            formData.append("password", this.form.password);

            let data = {
                formData: formData
            };
            
            this.$store.state.name = this.form.name;
            this.$store.state.email = this.form.email;
            this.$store.state.password = this.form.password;
 
            this.$store.dispatch("registerUser", data);
        }
    }
}
</script>