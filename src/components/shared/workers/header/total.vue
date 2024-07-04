<template>
    <div class="workers-header-total">
        <div class="workers-header-total__badge">
            <p class="workers-header-total__badge-label">total</p>
        </div>

        <div class="workers-header-total__info">
            <div class="workers-header-total__list">
                <div
                    class="workers-header-total__item"
                    v-for="item in getList"
                    :key="item.id"
                >
                    <p class="workers-header-total__item-label">
                        {{ item.label }}
                    </p>

                    <p class="workers-header-total__item-value">
                        {{ item.value }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WorkersHeaderTotal",
    props: {
        workers: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        getList() {
            return [
                {
                    id: 0,
                    label: "Current",
                    value: `${this.workers
                        .reduce(
                            (accumulator, worker) =>
                                accumulator + worker.hashCurrent,
                            0
                        )
                        .toFixed(2)} TH/s`,
                },
                {
                    id: 1,
                    label: "Average for 1h",
                    value: `${this.workers.reduce(
                        (accumulator, worker) => accumulator + worker.hash1Hour,
                        0
                    )} TH/s`,
                },
                {
                    id: 2,
                    label: "Average for 24h",
                    value: `${this.workers.reduce(
                        (accumulator, worker) =>
                            accumulator + worker.stat24h.hashrate,
                        0
                    )} TH/s`,
                },
                {
                    id: 3,
                    label: "Reject rate / 24h",
                    value: `${this.workers.reduce(
                        (accumulator, worker) =>
                            accumulator + worker.stat24h.rejectPercent,
                        0
                    )} %`,
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.workers-header-total {
    background: $bg-gray-light;
    border-radius: 10px;
    display: flex;
    grid-column-gap: 15px;
    padding: 4px 16px 4px 4px;

    .workers-header-total__badge {
        background: #e5ebef;
        border-radius: 6px;
        padding: 26px 0px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .workers-header-total__badge-label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
        transform: rotate(-90deg);
        display: inline-block;
    }

    .workers-header-total__info {
        width: 100%;
        padding: 8px 0;
    }

    .workers-header-total__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .workers-header-total__item-label {
        font-size: 12px;
        line-height: 18px;
        color: $txt-light;
    }

    .workers-header-total__item-value {
        font-size: 12px;
        line-height: 18px;
        text-align: right;
        color: $txt-main;
    }
}
</style>
