<template>
    <div class="rating-table">
        <RatingTableHeader :sort="sort" @sort="onSort" />

        <RatingTableBody
            :rating="getRating"
            :charts="charts"
            @add="onAddChart"
            @remove="onRemoveChart"
        />
    </div>
</template>

<script>
import RatingTableHeader from "@/components/shared/rating/table/header.vue";
import RatingTableBody from "@/components/shared/rating/table/body.vue";

import {getSort} from "@/utils/functions";
import {SORT_VALUES} from "@/utils/constants";

export default {
    name: "RatingTable",
    components: {
        RatingTableHeader,
        RatingTableBody,
    },
    props: {
        rating: {
            type: Array,
            default: () => [],
        },
        charts: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            sort: {
                avrRate: "",
                // vipPayrate: "",
            },
        };
    },
    computed: {
        getRating() {
            const {avrRate} = this.sort;

            return avrRate ? getSort(this.sort, this.rating) : this.rating;
        },
    },
    methods: {
        onSort({key}) {
            switch (this.sort[key]) {
                case SORT_VALUES.default:
                    this.sort[key] = SORT_VALUES.asc;
                    break;
                case SORT_VALUES.asc:
                    this.sort[key] = SORT_VALUES.desc;
                    break;
                case SORT_VALUES.desc:
                    this.sort[key] = SORT_VALUES.default;
                    break;
                default:
                    break;
            }
        },

        onAddChart(chart) {
            this.$emit("add", chart);
        },

        onRemoveChart(chart) {
            this.$emit("remove", chart);
        },
    },
};
</script>
