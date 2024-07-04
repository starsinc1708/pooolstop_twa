<template>
    <div class="workers">
        <WorkersContent :workers="workers" :tags="tags" @workers="onWorkers" @getTags="getTags" @getWorkers="getWorkers"/>
    </div>
</template>

<script>
import WorkersContent from "@/components/shared/workers/content/content.vue";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "Workers",
    components: {
        WorkersContent,
    },
    data() {
        return {
            workers: [],
            tags: []
        };
    },
    async created() {
        this.getWorkers()
        this.getTags()
    },
    methods: {
        onWorkers(workers) {
            this.workers = workers;
        },

        async getTags() {
            await api.getUserTags().then((tags) => {
                this.tags = tags
                this.tags.forEach( t => t.show = false)
            })
        },

        async getWorkers() {
            await api.workers().then((workers) => {
                this.workers = workers;
            });
        }
    },
};
</script>
