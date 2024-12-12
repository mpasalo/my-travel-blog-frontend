<template>
    <div class="editPost text-white">
        <h1 class="text-[40px] text-center mb-4"><em>Posts</em></h1>
        <div class="form-group">
            <label class="label" for="title">Post Title</label>
            <input
                type="text"
                class="input form-control"
                name="title"
                v-model="post.title"
            />
        </div>
        <div class="form-group mt-4">
            <label class="label" for="body">Blog Content</label>
            <textarea
                name="body"
                class="textarea form-control"
                v-model="post.body"
            ></textarea>
        </div>
        <div class="form-group mt-4">
            <div class="control">
                <button @click="updateBlogPost()" class="btn btn-danger">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "vform";
import { mapGetters } from "vuex";
export default {
    created() {
        this.$store.dispatch("getPost", this.$route.params.id);
    },

    computed: {
        ...mapGetters({
            post: "post",
        })
    },

    data() {
        return {
            form: new Form({
                title: "",
                body: ""
            }),
            id: this.$route.params.id
        };
    },
    methods: {
        updateBlogPost() {
            this.form.title = this.post.title;
            this.form.body = this.post.body;

            // let formData = new FormData();

            // formData.append("title", this.post.title);
            // formData.append("body", this.post.body);

            let data = {
                id: this.id,
                formData: this.form              
            };

            this.$store.dispatch("editPost", data);
        }
    }
};
</script>