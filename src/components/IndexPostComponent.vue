<template>
    <div class="indexPosts text-white">
        <h1 class="text-[40px] text-center mb-4"><em>Posts</em></h1>
        <RouterLink to="/create-post"><button class="btn btn-info text-center mb-2">Create a new post</button></RouterLink>
        <div class="grid gap-4 grid-cols-3 grid-rows-3"> 
            <div v-for="post in posts">  
                <p class="text-[28px]">
                    {{ post.title }}
                    <span v-if="userId == post.user.id">
                        <RouterLink 
                            :to="{
                                name: 'editPost', 
                                params: 
                                {
                                    id: post.id,
                                }
                            }
                        ">
                            <ion-icon
                                name="create-outline"
                                class="btn btn-secondary btn-sm m-2"
                            ></ion-icon>
                        </RouterLink>
                        <ion-icon
                            name="trash-outline"
                            class="btn btn-danger btn-sm m-2"
                            @click="deletePost(post.title, post.id)"
                        ></ion-icon>
                    </span> 
                </p>
                {{ format_date(post.created_at) }} - {{ post.user.name }}
                <p> 
                    {{ post.body.substring(0,300) }}  {{ post.body.length > 300 ? '....' : '' }}  
                </p>
                <button class="btn btn-outline-primary my-2" @click="openPost(post)">Read More</button>
            </div>
        </div>
    </div>
</template>
<script>
import { IonIcon } from '@ionic/vue';
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';
import moment from 'moment';
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
        format_date(value){
            if (value) {
                return moment(String(value)).format('MM DD YYYY')
            }
        },
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
        },
        openPost(post) {
            Swal.fire({
                title: post.title,
                html: post.body,
                width: 1200,
                confirmButtonText: "Close",
            })
        }

    }
}
</script>