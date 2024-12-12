<template>
    <div class="post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
        <hr />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import moment from 'moment'

export default {
    created() {
        this.$store.dispatch("getPost", this.$route.params.id);
    },

    computed: {
        ...mapGetters({
            post: "post",
        })
    },

    methods: { 
      format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY-MM-DD')
          }
      },
   },
}
</script>