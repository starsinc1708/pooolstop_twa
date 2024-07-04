<template>
    <div class="dashboard-hashrate-chart">
        <div class="dashboard-hashrate-chart__container">
            <div class="dashboard-hashrate-chart__chart">
                <Line :data="getData" :options="getOptions" />
            </div>
        </div>

        <DashboardHashrateSet
            class="dashboard-hashrate-chart__set"
            :class="getHashrateSetViewClass"
            v-if="getHashrateIsShow"
        />
    </div>
</template>

<script>
import {
    getChartData,
    getChartOptions,
} from "@/components/shared/dashboard/hashrate/utils.js";

import {Line} from "vue-chartjs";
import {HASHRATE_UNIT} from "@/utils/constants"

import DashboardHashrateSet from "@/components/shared/dashboard/hashrate/set.vue";

const SCALE_FORMATS = {
    0: "HH:mm",
    1: "HH:mm",
    2: "HH:mm",
    3: "DD.MM",
};

const TOOLTIP_FORMATS = {
    0: "HH:mm DD.MM.YYYY",
    1: "HH:mm DD.MM.YYYY",
    2: "HH:mm DD.MM.YYYY",
    3: "DD.MM.YYYY",
};

const HASHRATE_SET_VIEWS = {
    0: "dashboard-hashrate-chart__set--hour",
    1: "dashboard-hashrate-chart__set--hours",
    2: "dashboard-hashrate-chart__set--day",
    3: "dashboard-hashrate-chart__set--month",
};

export default {
    name: "DashboardHashrateChart",
    components: {
        Line,
        DashboardHashrateSet,
    },
    props: {
        dashboard: {
            type: Object,
            required: true,
        },
        tab: {
            type: Number,
            required: true,
        },
        nominal: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getHashrateSetViewClass() {
            return HASHRATE_SET_VIEWS[this.tab];
        },

        getHashrateIsShow() {
            const {labels} = this.getChart;
            const {value} = this.nominal;

            return labels.length && value === null;
        },

        getScaleFormat() {
            return SCALE_FORMATS[this.tab];
        },

        getTooltipFormat() {
            return TOOLTIP_FORMATS[this.tab];
        },

        getChart() {
            const {chart} = this.dashboard;

            return chart;
        },

        getNominal() {
            if (this.dashboard.chart.unit) {
                const koef = HASHRATE_UNIT['TH'] / HASHRATE_UNIT[this.dashboard.chart.unit]
                return +(this.nominal.value * koef).toFixed(2)
            }
            return this.nominal.value;
        },

        getData() {
            const {hashrates} = this.getChart;

            return getChartData(hashrates, this.getChart.labels);
        },

        getOptions() {
            const {labels, unit} = this.getChart;

            return getChartOptions(
                labels,
                this.getScaleFormat,
                this.getTooltipFormat,
                unit,
                this.getNominal
            );
        },
    },
};
</script>

<style lang="scss">
.dashboard-hashrate-chart {
    width: 100%;
    position: relative;

    .dashboard-hashrate-chart__container {
        height: 300px;
    }

    .dashboard-hashrate-chart__chart {
        height: 100%;
    }

    .dashboard-hashrate-chart__set {
        position: absolute;
        bottom: -10px;
        left: -20px;
    }

    .dashboard-hashrate-chart__set--hour {
        bottom: 9px;
        left: -27px;
    }

    .dashboard-hashrate-chart__set--hours {
        bottom: -6px;
        left: -19px;
    }

    .dashboard-hashrate-chart__set--day {
        bottom: 10px;
        left: -28px;
    }

    .dashboard-hashrate-chart__set--month {
        bottom: 6px;
        left: -31px;
    }
}

@media screen and (max-width: 768px) {
    .dashboard-hashrate-chart {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .dashboard-hashrate-chart__container {
            @include scrollbar-x;
            height: 240px;
            max-width: 312px;
        }

        .dashboard-hashrate-chart__chart {
            width: 800px;
        }

        .dashboard-hashrate-chart__set {
            position: relative;
            margin: 5px 0 0 12px;
            left: 0;
            bottom: 0;
        }
    }
}
</style>
