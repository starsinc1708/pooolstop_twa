<template>
    <div class="workers-table-row-total">
        <div
            class="workers-table-row-total__cell"
            v-for="cell in getCells"
            :key="cell.id"
            :class="cell.class"
        >
            <p class="workers-table-row-total__cell-label" v-if="cell.label">
                {{ cell.label }}
            </p>

            <p class="workers-table-row-total__cell-value" v-if="cell.value">
                {{ cell.value }}
            </p>
        </div>
    </div>
</template>

<script>
const DEFAULT_FIXED_VALUE = 2;

export default {
    name: "WorkersTableRowTotal",
    props: {
        workers: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        avrReject () {
            const sum = this.workers.reduce((accumulator, worker) => accumulator + worker.stat24h.rejectPercent, 0)
            return sum / this.workers.length
        },
        getCells() {
            return [
                {
                    id: 0,
                    class: "workers-table-row-total__cell--status",
                },
                {
                    id: 1,
                    label: "Total",
                    class: "workers-table-row-total__cell--worker-name",
                },
                {
                    id: 2,
                    value: `${this.workers
                        .reduce(
                            (accumulator, worker) =>
                                accumulator + worker.hashCurrent,
                            0
                        )
                        .toFixed(DEFAULT_FIXED_VALUE)} Th`,
                    class: "workers-table-row-total__cell--current",
                },
                {
                    id: 3,
                    value: `${this.workers
                        .reduce(
                            (accumulator, worker) =>
                                accumulator + worker.hash1Hour,
                            0
                        )
                        .toFixed(DEFAULT_FIXED_VALUE)} Th`,
                    class: "workers-table-row-total__cell--hashrate-1h",
                },
                {
                    id: 4,
                    value: `${this.workers
                        .reduce(
                            (accumulator, worker) =>
                                accumulator + worker.stat24h.hashrate,
                            0
                        )
                        .toFixed(DEFAULT_FIXED_VALUE)} Th`,
                    class: "workers-table-row-total__cell--hashrate-24h",
                },
                {
                    id: 5,
                    value: `${this.avrReject.toFixed(DEFAULT_FIXED_VALUE)} %`,
                    class: "workers-table-row-total__cell--reject-rate",
                },
                // {
                //     id: 6,
                //     value: `${this.workers.reduce(
                //         (accumulator, worker) =>
                //             accumulator + worker.stat24h.uptime,
                //         0
                //     )} %`,
                //     class: "workers-table-row-total__cell--uptime",
                // },
                {
                    id: 7,
                    class: "workers-table-row-total__cell--toolbar",
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.workers-table-row-total {
    display: grid;
    grid-template-columns: 30px 400px 1fr 1fr 1fr 1fr 109px;
    padding: 12px 0;

    .workers-table-row-total__cell {
        padding: 0 12px;
    }

    .workers-table-row-total__cell-label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
    }

    .workers-table-row-total__cell-value {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
    }
}

@media screen and (max-width: 1440px) {
    .workers-table-row-total {
        grid-template-columns: 30px 350px 1fr 1fr 1fr 109px;

        .workers-table-row-total__cell--uptime,
        .workers-table-row-total__cell--reject-rate {
            display: none;
        }
    }
}

@media screen and (max-width: 1220px) {
    .workers-table-row-total {
        grid-template-columns: 30px 350px 1fr 1fr 109px;

        .workers-table-row-total__cell--hashrate-1h {
            display: none;
        }
    }
}

@media screen and (max-width: 1024px) {
    .workers-table-row-total {
        grid-template-columns: 30px 250px 1fr 1fr 37px;
    }
}

@media screen and (max-width: 768px) {
    .workers-table-row-total {
        grid-template-columns: 24px 130px 1fr 1fr 29px;

        .workers-table-row-total__cell {
            padding: 0 8px;
        }
    }
}
</style>
