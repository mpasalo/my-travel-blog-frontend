<template>
    <nav class="text-center text-white">
      <RouterLink to="/">Home</RouterLink> |
      <span v-if="!this.$store.state.isAuthenticated">
        <RouterLink to="/login">Login</RouterLink> |
        <RouterLink to="/register">Register</RouterLink>
      </span>
      <span v-else>
        <RouterLink to="/posts">Posts</RouterLink> |
        <button @click="logOutUser()" >Logout</button>
      </span> 
    </nav>
  <main>
    <RouterView />
    
  </main>
</template>
<script>
import { RouterView, RouterLink } from 'vue-router';
import { logOut, checkAuthentication } from '../userFunctions'

export default {
    mounted() {
        checkAuthentication(); 
    },
    methods:{
      logOutUser() {
        logOut().then(
            (response) => {
              this.$router.push({ path: '/' });         
          }
        )
        this.$store.state.isAuthenticated = false
        localStorage.clear();
      }
    }
}
</script>