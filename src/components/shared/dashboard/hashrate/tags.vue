<template>
    <div class="dashboard-hashrate-tags">
        <UITag v-for="tag in getTags" :key="tag.id" :tag="tag" />
    </div>
</template>

<script>
import UITag from "@/components/ui/tag/tag.vue";

import {VIEWS} from "@/components/ui/tag/tag.vue";

export default {
    name: "DashboardHashrateTags",
    components: {
        UITag,
    },
    props: {
        dashboard: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getTags() {
            const {totalHashrate, unit} = this.dashboard.chart;

            return [
                {
                    id: 0,
                    label: "Hashrate",
                    value: `${totalHashrate}` + ' ' + `${unit}`,
                    view: VIEWS.purple,
                },
                // {
                //     id: 1,
                //     label: "Uptime",
                //     value: `${uptime}%`,
                //     view: VIEWS.green,
                // },
            ];
        },
    },
};
</script>

<style lang="scss">
.dashboard-hashrate-tags {
    display: flex;
    grid-column-gap: 24px;
}

@media screen and (max-width: 768px) {
    .dashboard-hashrate-tags {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 16px;
    }
}
</style>
