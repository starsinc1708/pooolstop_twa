<template>
    <div class="dashboard-income-table-header">
        <div
            class="dashboard-income-table-header__column"
            v-for="column in getColumns"
            :key="column.id"
            :class="column.class"
        >
            <p class="dashboard-income-table-header__label">
                {{ column.label }}
            </p>

            <p
                class="dashboard-income-table-header__label dashboard-income-table-header__label--small"
                v-if="column.labelSmall"
            >
                {{ column.labelSmall }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashboardIncomeTableHeader",
    computed: {
        getColumns() {
            return [
                {
                    id: 0,
                    label: "Date",
                    labelSmall: "Date / Avg. Hachrate",
                    class: "dashboard-income-table-header__column--date",
                },
                {
                    id: 1,
                    label: "Hashrate 24h",
                    labelSmall: "Income / Bonus",
                    class: "dashboard-income-table-header__column--hashrate",
                },
                {
                    id: 2,
                    label: "Income, BTC",
                    class: "dashboard-income-table-header__column--income",
                },
                {
                    id: 3,
                    label: "Bonus, BTC",
                    class: "dashboard-income-table-header__column--bonus",
                },
                {
                    id: 4,
                    label: "Rate, Sat/TH",
                    class: "dashboard-income-table-header__column--rate",
                },
                // {
                //     id: 5,
                //     label: "Uptime, %",
                //     class: "dashboard-income-table-header__column--uptime",
                // },
            ];
        },
    },
};
</script>

<style lang="scss">
.dashboard-income-table-header {
    background: $bg-gray;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 230px 1fr 1fr 1fr 1fr;
    padding: 10px 0;

    .dashboard-income-table-header__column {
        display: flex;
        align-items: center;
        padding: 0 30px;
    }

    .dashboard-income-table-header__label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
        text-align: left;
    }

    .dashboard-income-table-header__label--small {
        display: none;
    }
}

@media screen and (max-width: 1440px) {
    .dashboard-income-table-header {
        grid-template-columns: 230px 1fr 1fr 1fr;

        .dashboard-income-table-header__column--rate,
        .dashboard-income-table-header__column--uptime {
            display: none;
        }
    }
}

@media screen and (max-width: 1024px) {
    .dashboard-income-table-header {
        grid-template-columns: 230px 1fr 1fr;

        .dashboard-income-table-header__column--bonus {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .dashboard-income-table-header {
        grid-template-columns: 1fr 1fr 55px;
        border-radius: 0;
        padding: 13px 0;

        .dashboard-income-table-header__column {
            padding: 0 12px;
        }

        .dashboard-income-table-header__label {
            font-size: 10px;
            line-height: 16px;
            display: none;
        }

        .dashboard-income-table-header__label--small {
            display: inline-block;
        }

        .dashboard-income-table-header__column--hashrate {
            justify-content: flex-end;
        }
    }
}
</style>
