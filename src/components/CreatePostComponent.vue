<template>
    <div class="Create Post text-white">
        <h1 class="text-[40px] text-center mb-4"><em>Create Posts</em></h1>
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" name="title" id="name" class="form-control" v-model="form.title">
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Body</label>
            <textarea rows="5" name="description" id="description" class="form-control" v-model="form.description"></textarea>
        </div>
        
        <button @click="savePost()" class="btn btn-info">Save Post</button>
    </div>
</template>
<script>
import Form from "vform";
export default {
    data() {
        return {
            form: new Form({
                title: "",
                description: "",
            })
        };
    },

    methods: {
        savePost: function() {
            let formData = new FormData();

            formData.append("title", this.form.title);
            formData.append("body", this.form.description);

            let data = {
                formData: formData
            };

            this.$store.dispatch("savePost", data);
        }
    }
}
</script>
