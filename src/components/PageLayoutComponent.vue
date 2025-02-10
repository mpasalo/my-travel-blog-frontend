<template>
  <nav class="text-center text-[20px] nav-links">
    <RouterLink to="/" class="text-white">HOME</RouterLink> |
    <span v-if="!this.$store.state.isAuthenticated">
      <RouterLink to="/login" class="text-white">LOGIN</RouterLink> |
      <RouterLink to="/register" class="text-white">REGISTER</RouterLink>
    </span>
    <span v-else>
      <RouterLink to="/posts" class="text-white">POSTS</RouterLink> |
      <button class="text-green-700 text-white" @click="logOutUser()" >LOGOUT</button>
    </span> 
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<script>
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