<template>
    <div class="workers-table-row-chart">
        <div class="workers-table-row-chart__container">
            <div class="workers-table-row-chart__chart">
                <Bar :data="getData" :options="getOptions" />
            </div>
        </div>
    </div>
</template>

<script>
import {
    getChartData,
    getChartOptions,
} from "@/components/shared/workers/table/utils.js";

import {Bar} from "vue-chartjs";

const SCALE_FORMATS = {
    stat1h: "HH:mm",
    stat4h: "HH:mm",
    stat24h: "HH:mm",
    stat7days: "DD.MM hh:mm",
    stat1months: "DD.MM",
};

const TOOLTIP_FORMATS = {
    stat1h: "HH:mm:ss",
    stat4h: "HH:mm",
    stat24h: "DD.MM hh:mm",
    stat7days: "DD.MM hh:mm",
    stat1months: "DD.MM.YYYY",
};

export default {
    name: "WorkersTableRowChart",
    components: {
        Bar,
    },
    props: {
        worker: {
            type: Object,
            required: true,
        },
        stat: {
            type: Object,
            required: true,
        },
        tab: {
            type: String,
            required: true,
        },
    },
    computed: {
        getChart() {
            return this.stat.chart;
        },

        getUnit() {
            return this.stat.unit;
        },

        getScaleFormat() {
            return SCALE_FORMATS[this.tab];
        },

        getTooltipFormat() {
            return TOOLTIP_FORMATS[this.tab];
        },

        getNominal() {
            return this.worker.nominal;
        },

        getData() {
            const {hashrates, labels, rejects} = this.getChart;

            return getChartData(hashrates, labels, rejects);
        },

        getOptions() {
            const {labels} = this.getChart;

            return getChartOptions(
                labels,
                this.getScaleFormat,
                this.getTooltipFormat,
                this.getUnit,
                this.getNominal
            );
        },
    },
};
</script>

<style lang="scss">
.workers-table-row-chart {
    width: 100%;

    .workers-table-row-chart__container {
        height: 280px;
    }

    .workers-table-row-chart__chart {
        height: 100%;
    }
}

@media screen and (max-width: 768px) {
    .workers-table-row-chart {
        .workers-table-row-chart__container {
            @include scrollbar-x;
            max-width: 334px;
        }

        .workers-table-row-chart__chart {
            width: 800px;
        }

        .workers-table-row-chart__nominal {
            grid-column-gap: 4px;
            padding: 3px 8px 3px 4px;
            font-size: 10px;
            line-height: 12px;
            width: 87px;
            white-space: nowrap;
        }
    }
}
</style>
