<template>
    <div class="dashboard-hashrate">
        <DashboardHashrateHeader
            :dashboard="dashboard"
            :tab="tab"
            @onChangeTab="onChangeTab"
        />

        <DashboardHashrateChart
            class="dashboard-hashrate__chart"
            :dashboard="dashboard"
            :tab="tab"
            :nominal="nominal"
        />

        <DashboardHashrateWorkers :dashboard="dashboard" @click="goto('\workers')"/>
    </div>
</template>

<script>
import DashboardHashrateHeader from "@/components/shared/dashboard/hashrate/header.vue";
import DashboardHashrateChart from "@/components/shared/dashboard/hashrate/chart.vue";
import DashboardHashrateWorkers from "@/components/shared/dashboard/hashrate/workers.vue";

export default {
    name: "DashboardHashrate",
    components: {
        DashboardHashrateHeader,
        DashboardHashrateChart,
        DashboardHashrateWorkers,
    },
    props: {
        dashboard: {
            type: Object,
            required: true,
        },
        nominal: {
            type: Object,
            required: true,
        },
        tab: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onChangeTab({value}) {
            this.$emit("tab", value);
        },
        goto(route) {
            this.$router.push(route)
        }
    }
};
</script>

<style lang="scss">
.dashboard-hashrate {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $white;
    border-radius: 16px;
    padding: 22px 36px 32px 41px;

    .dashboard-hashrate__chart {
        margin: 22px 0 30px 0;
    }
}

@media screen and (max-width: 768px) {
    .dashboard-hashrate {
        padding: 13px 16px 26px 16px;

        .dashboard-hashrate__chart {
            margin-top: 21px;
        }
    }
}
</style>
