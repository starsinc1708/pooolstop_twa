<template>
    <div class="rating-pools">
        <RatingPoolsHeader :tab="tab" @tab="onTab" @rating="onRating" />

        <RatingTable
            :rating="rating"
            :charts="charts"
            @add="onAddChart"
            @remove="onRemoveChart"
        />
    </div>
</template>

<script>
import RatingPoolsHeader from "@/components/shared/rating/pools/header.vue";
import RatingTable from "@/components/shared/rating/table/table.vue";

export default {
    name: "RatingPools",
    components: {
        RatingPoolsHeader,
        RatingTable,
    },
    props: {
        tab: {
            type: String,
            required: true,
        },
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
        onTab(tab) {
            this.$emit("tab", tab);
        },

        onRating(rating) {
            this.$emit("rating", rating);
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

<style lang="scss">
.rating-pools {
    background: $white;
    border-radius: 16px;
    padding: 22px 20px 44px 20px;
    display: flex;
    flex-direction: column;
    grid-row-gap: 34px;
}

@media screen and (max-width: 768px) {
    .rating-pools {
        padding: 13px 0 16px 0;
        grid-row-gap: 23px;
    }
}
</style>
