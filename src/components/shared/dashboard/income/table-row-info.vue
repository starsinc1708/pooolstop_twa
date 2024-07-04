<template>
    <div class="dashboard-income-table-row-info">
        <div
            class="dashboard-income-table-row-info__cell"
            v-for="cell in getCells"
            :key="cell.id"
        >
            <p class="dashboard-income-table-row-info__label">
                {{ cell.label }}
            </p>

            <p class="dashboard-income-table-row-info__value">
                {{ cell.value }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashboardIncomeTableRowInfo",
    props: {
        row: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getCells() {
            const {rate} = this.row;

            return [
                {
                    id: 0,
                    label: "Rate:",
                    value: `${rate} Sat/Th`,
                },
                // {
                //     id: 1,
                //     label: "Uptime:",
                //     value: "??? %",
                // },
            ];
        },
    },
};
</script>

<style lang="scss">
.dashboard-income-table-row-info {
    display: grid;
    grid-template-columns: 1fr 55px;
    width: 100%;

    .dashboard-income-table-row-info__cell {
        padding: 10px 12px;
        display: flex;
        align-items: center;
        grid-column-gap: 4px;
        border-top: 1px solid $gray;
    }

    .dashboard-income-table-row-info__label {
        font-size: 12px;
        line-height: 12px;
        color: $txt-light;
    }

    .dashboard-income-table-row-info__value {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        white-space: nowrap;
    }
}
</style>
