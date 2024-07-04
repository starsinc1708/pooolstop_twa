<template>
    <div class="workers-header">
        <WorkersHeaderTabs :tab="tab" :workers="workers" @tab="onTab" />

        <WorkersHeaderTotal class="workers-header__total" :workers="workers" />
    </div>
</template>

<script>
import WorkersHeaderTabs from "@/components/shared/workers/header/tabs.vue";
import WorkersHeaderTotal from "@/components/shared/workers/header/total.vue";

export default {
    name: "WorkersHeader",
    components: {
        WorkersHeaderTabs,
        WorkersHeaderTotal,
    },
    props: {
        tab: {
            type: String,
            required: true,
        },
        workers: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        onTab(tab) {
            this.$emit("tab", tab);
        },
    },
};
</script>

<style lang="scss">
.workers-header {
    padding: 0 10px;

    .workers-header__total {
        margin-top: 24px;
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .workers-header {
        padding: 20px 12px 0 12px;

        .workers-header__total {
            display: flex;
        }
    }
}
</style>
