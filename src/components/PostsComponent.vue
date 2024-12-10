<template>
    <div class="posts text-white">
        <h1 class="text-[40px] text-center mb-4"><em>Posts</em></h1>
        <RouterLink to="/create-post"><button class="btn btn-info text-center">Create a new post</button></RouterLink>
        
        <div v-for="post in posts">
            {{ post.title }}
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    mounted() {
        this.$store.dispatch("getPosts");
    },

    computed: {
        ...mapGetters({
            posts: "posts",
        })
    },
}
</script>