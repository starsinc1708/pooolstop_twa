<template>
    <div class="dashboard-income">
        <DashboardIncomeHeader
            :period="period"
            :total="total"
            :tags="tags"
            @period="onChangePeriod"
        />

        <DashboardIncomeTable
            class="dashboard-income__table"
            :incomes="incomes"
        />

        <UIShowMore
            v-if="getShowMoreIsShow"
            :disabled="getDisabled"
            @more="onChangePage"
        />
    </div>
</template>

<script>
import DashboardIncomeHeader from "@/components/shared/dashboard/income/header.vue";
import DashboardIncomeTable from "@/components/shared/dashboard/income/table.vue";
import UIShowMore from "@/components/ui/show-more/show-more.vue";

export default {
    name: "DashboardIncome",
    components: {
        DashboardIncomeHeader,
        DashboardIncomeTable,
        UIShowMore,
    },
    props: {
        incomes: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
        period: {
            type: Array,
            default: []
        },
        total: {
            type: Number,
            default: 0
        },
        tags: {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getShowMoreIsShow() {
            return this.show && this.incomes.length;
        },
    },
    methods: {
        onChangePeriod(period) {
            this.$emit("period", period);
        },

        onChangePage() {
            this.$emit("page");
        },
    },
};
</script>

<style lang="scss">
.dashboard-income {
    background: $white;
    border-radius: 16px;
    padding: 23px 20px 28px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .dashboard-income__table {
        margin: 30px 0 32px 0;
    }
}

@media screen and (max-width: 768px) {
    .dashboard-income {
        padding: 0 0 24px 0;

        .dashboard-income__table {
            margin: 20px 0 24px 0;
        }
    }
}
</style>
