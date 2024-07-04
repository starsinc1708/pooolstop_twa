<template>
    <div class="dashboard-income-table-body">
        <DashboardIncomeTableRow
            v-for="(row, rowIndex) in rows"
            :key="row.created"
            :row="row"
            :rowIndex="rowIndex"
            :rows="rows"
        />
    </div>
</template>

<script>
import DashboardIncomeTableRow from "@/components/shared/dashboard/income/table-row.vue";

export default {
    name: "DashboardIncomeTableBody",
    components: {
        DashboardIncomeTableRow,
    },
    props: {
        rows: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
