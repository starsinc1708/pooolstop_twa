<template>
    <div class="rating-table-row">
        <component
            class="rating-table-row__cell"
            v-for="cell in getCells"
            :key="cell.id"
            :cell="cell"
            :is="cell.component"
            :class="cell.class"
            :active="active"
            @add="onAddChart"
            @remove="onRemoveChart"
        />
    </div>
</template>

<script>
import RatingTableCellRating from "@/components/shared/rating/table/cell-rating.vue";
import RatingTableCellPool from "@/components/shared/rating/table/cell-pool.vue";
import RatingTableCell from "@/components/shared/rating/table/cell.vue";
import RatingTableCellChart from "@/components/shared/rating/table/cell-chart.vue";
import RatingTableCellRatingPool from "@/components/shared/rating/table/cell-rating-pool.vue";
import RatingTableCellPayrate from "@/components/shared/rating/table/cell-payrate.vue";

const COMPONENTS = {
    default: RatingTableCell,
    rating: RatingTableCellRating,
    pool: RatingTableCellPool,
    chart: RatingTableCellChart,
    ratingPool: RatingTableCellRatingPool,
    payrate: RatingTableCellPayrate,
};

const DEFAULT_INDEX = 1;
// const FIRST_ROW_INDEX = 0;
// const MAX_PERCENT = 100;
// const DEFAULT_FIXED_VALUE = 2;
const DEFAULT_AVR_RATE_FIXED_VALUE = 8;

export default {
    name: "RatingTableRow",
    components: {
        RatingTableCellRating,
        RatingTableCell,
    },
    props: {
        row: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        getCells() {
            const {pool_url, pool, avrRate} = this.row;

            const id = this.index + DEFAULT_INDEX;

            return [
                {
                    id: 0,
                    component: COMPONENTS.rating,
                    poolId: id,
                    poolUrl: pool_url,
                    class: "rating-table-row__cell--default",
                },
                {
                    id: 1,
                    component: COMPONENTS.pool,
                    pool,
                    class: "rating-table-row__cell--default",
                },
                // {
                //     id: 2,
                //     label: this.getPercent,
                //     component: COMPONENTS.default,
                //     class: "rating-table-row__cell--default",
                // },
                {
                    id: 3,
                    label: avrRate.toFixed(DEFAULT_AVR_RATE_FIXED_VALUE),
                    component: COMPONENTS.default,
                    class: "rating-table-row__cell--default",
                },
                {
                    id: 5,
                    component: COMPONENTS.ratingPool,
                    class: "rating-table-row__cell--adaptive",
                    poolId: id,
                    pool,
                    percent: this.getPercent,
                },
                {
                    id: 6,
                    component: COMPONENTS.payrate,
                    class: "rating-table-row__cell--adaptive rating-table-row__cell--payrate",
                    base: avrRate,
                },
                {
                    id: 7,
                    component: COMPONENTS.chart,
                },
            ];
        },

        // getPercent() {
        //     let percent = MAX_PERCENT;

        //     if (this.index === FIRST_ROW_INDEX) {
        //         return `${percent}%`;
        //     }

        //     percent =
        //         (this.rating[this.index - DEFAULT_INDEX].avrRate /
        //             this.row.avrRate) *
        //         MAX_PERCENT;

        //     return percent !== MAX_PERCENT
        //         ? `${percent.toFixed(DEFAULT_FIXED_VALUE)}%`
        //         : `${percent}%`;
        // },
    },
    methods: {
        onAddChart() {
            this.$emit("add", this.row);
        },

        onRemoveChart() {
            this.$emit("remove", this.row);
        },
    },
};
</script>

<style lang="scss">
.rating-table-row {
    padding: 6px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-radius: 10px;

    &:nth-child(2n) {
        background: $bg-gray-light;
    }

    .rating-table-row__cell--adaptive {
        display: none;
    }
}

@media screen and (max-width: 1440px) {
    .rating-table-row {
        grid-template-columns: repeat(3, 1fr);
        padding: 11px 0;
        height: 60px;

        .rating-table-row__cell--default {
            display: none;
        }

        .rating-table-row__cell--adaptive {
            display: flex;
        }

        .rating-table-row__cell--payrate {
            justify-content: center;
        }
    }
}

@media screen and (max-width: 1024px) {
    .rating-table-row {
        grid-template-columns: 1fr 1fr 100px;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-row {
        grid-template-columns: 1fr 1fr 70px;
        border-radius: 0;
    }
}
</style>
