<template>
    <div class="rating-content">
        <UIPageHeader title="Rating" />

        <RatingPools
            :tab="tab"
            :rating="rating"
            :charts="charts"
            @tab="onTab"
            @rating="onRating"
            @add="onAddChart"
            @remove="onRemoveChart"
        />

        <RatingChart :charts="charts" :scale="scale" @scale="onChangeScale" />

        <RatingNavigation class="rating-content__navigation" :charts="charts" />
    </div>
</template>

<script>
import UIPageHeader from "@/components/ui/page-header/page-header.vue";
import RatingPools from "@/components/shared/rating/pools/pools.vue";
import RatingChart from "@/components/shared/rating/chart/chart.vue";
import RatingNavigation from "@/components/shared/rating/navigation/navigation.vue";

export default {
    name: "RatingContent",
    components: {
        UIPageHeader,
        RatingPools,
        RatingChart,
        RatingNavigation,
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
    },
    data() {
        return {
            scale: 0,
            charts: [],
        };
    },
    methods: {
        onTab(tab) {
            this.$emit("tab", tab);
        },

        onRating(rating) {
            this.scale = 0;
            this.charts = [];

            this.$emit("rating", rating);
        },

        onAddChart(chart) {
            if (!this.charts.length) {
                this.scale = Object.keys(chart.rates).length;
            }

            this.charts.push(chart);
        },

        onRemoveChart(chart) {
            this.charts.splice(this.charts.indexOf(chart), 1);

            if (!this.charts.length) {
                this.scale = 0;
            }
        },

        onChangeScale(scale) {
            this.scale = scale;
        },
    },
};
</script>

<style lang="scss">
.rating-content {
    display: flex;
    flex-direction: column;
    grid-row-gap: 16px;
    position: relative;

    .rating-content__navigation {
        position: fixed;
        bottom: 22px;
        z-index: 1000;
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .rating-content {
        .rating-content__navigation {
            display: flex;
        }
    }
}
</style>
