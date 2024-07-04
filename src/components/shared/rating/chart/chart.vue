<template>
    <div class="rating-chart" id="rating-chart">
        <RatingChartHeader
            :scale="scale"
            :difficutly="difficutly"
            :payrate="payrate"
            :max="getScaleMax"
            @scale="onChangeScale"
            @difficutly="onChangeDifficutly"
            @payrate="onChangePayrate"
        />

        <RatingChartGraph
            :scale="scale"
            :difficutly="difficutly"
            :payrate="payrate"
            :charts="charts"
            :labels="getLabelsFiltered"
        />
    </div>
</template>

<script>
import RatingChartHeader from "@/components/shared/rating/chart/header.vue";
import RatingChartGraph from "@/components/shared/rating/chart/graph.vue";

export default {
    name: "RatingChart",
    components: {
        RatingChartHeader,
        RatingChartGraph,
    },
    props: {
        charts: {
            type: Array,
            default: () => [],
        },
        scale: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            difficutly: false,
            payrate: false,
        };
    },
    computed: {
        getLabels() {
            const labels = [];

            this.charts.forEach((chart) => {
                const {rates} = chart;

                Object.keys(rates).forEach((rate) => {
                    const findLabel = labels.find((label) => label === rate);

                    if (!findLabel) {
                        labels.push(rate);
                    }
                });
            });

            return labels.sort();
        },

        getLabelsFiltered() {
            return this.getLabels.slice(0, this.scale);
        },

        getScaleMax() {
            return this.getLabels.length;
        },
    },
    methods: {
        onChangeScale(scale) {
            this.$emit("scale", scale);
        },

        onChangeDifficutly(difficutly) {
            this.difficutly = difficutly;
        },

        onChangePayrate(payrate) {
            this.payrate = payrate;
        },
    },
};
</script>

<style lang="scss">
.rating-chart {
    background: $white;
    border-radius: 16px;
    padding: 22px 36px 29px 29px;
    display: flex;
    flex-direction: column;
    grid-row-gap: 23px;
}

@media screen and (max-width: 768px) {
    .rating-chart {
        padding: 14px 7px 29px 5px;
        grid-row-gap: 24px;
    }
}
</style>
