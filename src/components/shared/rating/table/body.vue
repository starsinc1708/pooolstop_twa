<template>
    <div class="rating-table-body">
        <RatingTableRow
            v-for="(row, rowIndex) in rating"
            :key="row.id"
            :row="row"
            :active="onRowIsActive(row)"
            :index="rowIndex"
            :rating="rating"
            @add="onAddChart"
            @remove="onRemoveChart"
        />
    </div>
</template>

<script>
import RatingTableRow from "@/components/shared/rating/table/row.vue";

export default {
    name: "RatingTableBody",
    components: {
        RatingTableRow,
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
    methods: {
        onAddChart(chart) {
            this.$emit("add", chart);
        },

        onRemoveChart(chart) {
            this.$emit("remove", chart);
        },

        onRowIsActive({pool_id}) {
            return this.charts.find((chart) => chart.pool_id === pool_id);
        },
    },
};
</script>
