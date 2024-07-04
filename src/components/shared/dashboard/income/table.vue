<template>
    <div class="dashboard-income-table">
        <DashboardIncomeTableHeader />

        <DashboardIncomeTableBody :rows="incomes" />
    </div>
</template>

<script>
import DashboardIncomeTableHeader from "@/components/shared/dashboard/income/table-header.vue";
import DashboardIncomeTableBody from "@/components/shared/dashboard/income/table-body.vue";

export default {
    name: "DashboardIncomeTable",
    components: {
        DashboardIncomeTableHeader,
        DashboardIncomeTableBody,
    },
    props: {
        incomes: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss">
.dashboard-income-table {
    width: 100%;
}
</style>
