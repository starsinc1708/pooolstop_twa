<template>
    <div class="workers-table-row-info">
        <div class="workers-table-row-info__header">
            <div class="workers-table-row-info__tags">
                <UITag
                    v-for="tag in getTags"
                    :key="tag.id"
                    :tag="tag"
                    :small="true"
                />
            </div>

            <UITabs
                :tabs="getTabs"
                :tabActive="tab"
                :disabled="getDisabled"
                @tab="onTab"
            />
        </div>

        <WorkersTableRowChart :worker="worker" :stat="stat" :tab="tab" />

        <UIHashrate
            class="workers-table-row-info__hashrate"
            :toggle="toggle"
            :disabled="getDisabled"
            @toggle="onToggle"
            @hashrate="onHashrate"
        />
    </div>
</template>

<script>
import UITag, {VIEWS} from "@/components/ui/tag/tag.vue";
import UITabs from "@/components/ui/tabs/tabs.vue";
import WorkersTableRowChart from "@/components/shared/workers/table/row-chart.vue";
import UIHashrate from "@/components/ui/hashrate/hashrate.vue";

import {statFactory} from "@/utils/factory.js";

import Api from "@/api/api";

const api = new Api();

const TAB_VALUES = {
    stat1h: "stat1h",
    stat4h: "stat4h",
    stat24h: "stat24h",
    stat7days: "stat7days",
    stat1months: "stat1months",
};

const STAT_PARAMS = {
    stat1h: {
        count: 61,
        step: 60000,
    },
    stat4h: {
        count: 25,
        step: 600000,
    },
    stat24h: {
        count: 25,
        step: 3600000,
    },
    stat7days: {
        count: 43,
        step: 14400000,
    },
    stat1months: {
        count: 32,
        step: 86400000,
    },
};

export default {
    name: "WorkersTableRowInfo",
    components: {
        UITag,
        UITabs,
        WorkersTableRowChart,
        UIHashrate,
    },
    props: {
        worker: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            tab: TAB_VALUES.stat1h,
            stat: statFactory(),
            toggle: false,
            loading: false,
        };
    },
    created() {
        this.onStat();
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getHashrateIsShow() {
            return !this.worker.nominal;
        },

        getTags() {
            return [
                {
                    id: 0,
                    label: "Average hashrate",
                    value: `${this.stat.hashrate} ${this.stat.unit}`,
                    view: VIEWS.purple,
                },
                // {
                //     id: 1,
                //     label: "Uptime",
                //     value: `${this.stat.uptime}%`,
                //     view: VIEWS.green,
                // },
                {
                    id: 2,
                    label: "Reject rate",
                    value: `${this.stat.rejectPercent}%`,
                    view: VIEWS.orange,
                },
            ];
        },

        getTabs() {
            return [
                {
                    id: 0,
                    label: "1h",
                    value: TAB_VALUES.stat1h,
                },
                {
                    id: 1,
                    label: "4h",
                    value: TAB_VALUES.stat4h,
                },
                {
                    id: 2,
                    label: "1d",
                    value: TAB_VALUES.stat24h,
                },
                {
                    id: 3,
                    label: "7d",
                    value: TAB_VALUES.stat7days,
                },
                {
                    id: 4,
                    label: "1m",
                    value: TAB_VALUES.stat1months,
                },
            ];
        },
    },
    methods: {
        onTab({value}) {
            this.tab = value;

            this.onStat();
        },

        onToggle(toggle) {
            this.toggle = toggle;
        },

        async onStat() {
            try {
                this.loading = true;

                await api
                    .stat(this.worker.id, STAT_PARAMS[this.tab])
                    .then((stat) => {
                        this.stat = stat;

                        this.loading = false;
                    });
            } catch (e) {
                this.loading = false;
            }
        },

        async onHashrate(hashrate) {
            try {
                this.loading = true;

                await api
                    .nominal({
                        id: this.worker.id,
                        nominal: hashrate,
                    })
                    .then(async () => {
                        await api.workers().then((workers) => {
                            this.$emit("workers", workers);

                            this.loading = false;
                            this.toggle = false;
                        });
                    });
            } catch (e) {
                this.loading = false;
                this.toggle = false;
            }
        },
    },
};
</script>

<style lang="scss">
.workers-table-row-info {
    padding: 20px 0 29px 0;
    border-bottom: 1px solid $gray;

    .workers-table-row-info__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 48px;
    }

    .workers-table-row-info__tags {
        display: flex;
        grid-column-gap: 24px;
    }

    .workers-table-row-info__hashrate {
        display: none;
    }
}

@media screen and (max-width: 1440px) {
    .workers-table-row-info {
        .workers-table-row-info__header {
            flex-direction: column;
            align-items: center;
            grid-row-gap: 12px;
        }
    }
}

@media screen and (max-width: 768px) {
    .workers-table-row-info {
        padding: 4px 12px 10px 12px;
        border-bottom: none;

        .workers-table-row-info__header {
            margin-bottom: 16px;
        }

        .workers-table-row-info__tags {
            grid-column-gap: 8px;
        }

        .workers-table-row-info__hashrate {
            display: flex;
            margin-top: 8px;
        }
    }
}
</style>
