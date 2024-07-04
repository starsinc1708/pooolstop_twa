<template>
    <div class="rating-chart-graph">
        <div class="rating-chart-graph__container">
            <div class="rating-chart-graph__chart">
                <Line :data="getData" :options="getOptions" />
            </div>
        </div>
    </div>
</template>

<script>
import {Line} from "vue-chartjs";

import {
    getChartData,
    getChartOptions,
} from "@/components/shared/rating/chart/utils.js";

const SCREENS = {
    small: 768,
};

export default {
    name: "RatingChartGraph",
    components: {
        Line,
    },
    props: {
        scale: {
            type: Number,
            required: true,
        },
        difficutly: {
            type: Number,
            required: true,
        },
        payrate: {
            type: Number,
            required: true,
        },
        charts: {
            type: Array,
            default: () => [],
        },
        labels: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            screen: 0,
        };
    },
    created() {
        window.addEventListener("resize", this.onChangeScreen);

        this.onChangeScreen();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.onChangeScreen);
    },
    computed: {
        getData() {
            return getChartData(this.charts, this.labels);
        },

        getOptions() {
            return getChartOptions(this.labels, this.getLegendIsShow);
        },

        getLegendIsShow() {
            return this.screen > SCREENS.small;
        },
    },
    methods: {
        onChangeScreen() {
            this.screen = window.innerWidth;
        },
    },
};
</script>

<style lang="scss">
.rating-chart-graph {
    .rating-chart-graph__container {
        height: 300px;
    }

    .rating-chart-graph__chart {
        height: 100%;
    }
}

@media screen and (max-width: 768px) {
    .rating-chart-graph {
        .rating-chart-graph__container {
            @include scrollbar-x;
            height: 240px;
            max-width: 348px;
        }

        .rating-chart-graph__chart {
            width: 800px;
        }
    }
}
</style>
