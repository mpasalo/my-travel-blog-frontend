<template>
<div class="register text-white">
    <h1 class="text-[40px] text-center mb-4"><em>Register</em></h1>

    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>

    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>

    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
  
    <button @click="registerUser()"  class="btn btn-info">Submit</button>
</div>
</template>
<script>
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

            this.$store.dispatch("user/register", data);
        }
    }
}
</script>