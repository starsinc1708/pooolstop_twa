<template>
    <div class="rating-table-header">
        <component
            class="rating-table-header__column"
            v-for="column in getColumns"
            :class="column.class"
            :key="column.id"
            :is="column.component"
            :column="column"
            :sort="sort"
            @sort="onSort"
        />
    </div>
</template>

<script>
import RatingTableColumn from "@/components/shared/rating/table/column.vue";
import RatingTableColumnRatingPool from "@/components/shared/rating/table/column-rating-pool.vue";
import RatingTableColumnPayrate from "@/components/shared/rating/table/column-payrate.vue";

const COMPONENTS = {
    default: RatingTableColumn,
    ratingPool: RatingTableColumnRatingPool,
    payrate: RatingTableColumnPayrate,
};

export default {
    name: "RatingTableHeader",
    components: {
        RatingTableColumn,
        RatingTableColumnRatingPool,
        RatingTableColumnPayrate,
    },
    props: {
        sort: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getColumns() {
            return [
                {
                    id: 0,
                    label: "Rating",
                    info: "The rating is based on actually working equipment connected through anonymous accounts.",
                    class: "rating-table-header__column--default",
                    component: COMPONENTS.default,
                },
                {
                    id: 1,
                    label: "Pool",
                    class: "rating-table-header__column--default",
                    component: COMPONENTS.default,
                },
                // {
                //     id: 2,
                //     label: "%",
                //     class: "rating-table-header__column--default",
                //     component: COMPONENTS.default,
                // },
                {
                    id: 3,
                    label: "Base payrate, BTC",
                    sort: true,
                    key: "avrRate",
                    class: "rating-table-header__column--default",
                    component: COMPONENTS.default,
                },
                // {
                //     id: 4,
                //     label: "Vip payrate, BTC",
                //     sort: true,
                //     key: "vipPayrate",
                //     class: "rating-table-header__column--default",
                //     component: COMPONENTS.default,
                // },
                {
                    id: 5,
                    component: COMPONENTS.ratingPool,
                    class: "rating-table-header__column--adaptive",
                },
                {
                    id: 6,
                    component: COMPONENTS.payrate,
                    class: "rating-table-header__column--adaptive",
                },
                {
                    id: 7,
                    label: "Add to chart",
                    labelSmall: "Chart",
                    component: COMPONENTS.default,
                },
            ];
        },
    },
    methods: {
        onSort(column) {
            this.$emit("sort", column);
        },
    },
};
</script>

<style lang="scss">
.rating-table-header {
    background: $bg-gray;
    border-radius: 10px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    .rating-table-header__column--adaptive {
        display: none;
    }
}

@media screen and (max-width: 1440px) {
    .rating-table-header {
        grid-template-columns: repeat(3, 1fr);

        .rating-table-header__column--default {
            display: none;
        }

        .rating-table-header__column--adaptive {
            display: flex;
        }
    }
}

@media screen and (max-width: 1024px) {
    .rating-table-header {
        grid-template-columns: 1fr 1fr 100px;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-header {
        grid-template-columns: 1fr 1fr 70px;
        border-radius: 0;
        padding: 13px 0;
    }
}
</style>
