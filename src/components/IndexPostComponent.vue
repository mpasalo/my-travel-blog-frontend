<template>
    <div class="indexPosts text-white">
        <h1 class="text-[40px] text-center mb-4"><em>Posts</em></h1>
        <RouterLink to="/create-post"><button class="btn btn-info text-center mb-2">Create a new post</button></RouterLink>
        
        <div v-for="post in posts">
            <p class="text-[24px]">
                <RouterLink 
                    :to="{
                        name: 'post', 
                        params: 
                        {
                            id: post.id,
                        }
                    }
                ">
                {{ post.title }}
            </RouterLink>
            <span v-if="userId == post.user.id">
                <ion-icon
                    name="trash-outline"
                    class="btn btn-danger btn-sm m-2"
                    @click="deletePost(post.title, post.id)"
                ></ion-icon>
            </span> 
            </p>
              
        </div>
    </div>
</template>
<script>
import { IonIcon } from '@ionic/vue';
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';
export default {
    components: { IonIcon },
    mounted() {
        this.$store.dispatch("getPosts");
    },

    data() {
        return {
            userId: localStorage.getItem("userId")
        }
    },

    computed: {
        ...mapGetters({
            posts: "posts",
        })
    },

    methods: {
        deletePost(title, id) {
            Swal.fire({
                title: "Post",
                html: "Are you sure you want delete " + title + "  ?",
                icon: "question",
                confirmButtonText: "Yes",
                denyButtonText: "No",
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch("deletePost", id);
                } else if (result.isDenied) {
                    Swal.close();
                }
            }); 
        }
    }
}
</script>