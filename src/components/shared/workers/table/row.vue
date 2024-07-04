<template>
    <div class="workers-table-row" :class="getViewClass">
        <div class="workers-table-row__cells" :class="getCellsViewClass">
            <WorkersTableStatus :worker="worker" />

            <WorkersTableHashrate :worker="worker" @workers="onWorkers" />

            <div
                class="workers-table-row__cell"
                v-for="cell in getCells"
                :key="cell.id"
                :class="cell.class"
            >
                <p class="workers-table-row__cell-label">
                    {{ cell.label }}
                </p>
            </div>

            <WorkersTableToolbar
                :toggle="toggle"
                :worker="worker"
                @remove="onRemove"
                @toggle="onToggle"
                @closeMinerTagModal="closeMinerTagModal"
            />
        </div>

        <WorkersTableRowInfo
            v-if="getInfoIsShow"
            :worker="worker"
            @workers="onWorkers"
        />
    </div>
</template>

<script>
import WorkersTableStatus from "@/components/shared/workers/table/status.vue";
import WorkersTableHashrate from "@/components/shared/workers/table/hashrate.vue";
import WorkersTableToolbar from "@/components/shared/workers/table/toolbar.vue";
import WorkersTableRowInfo from "@/components/shared/workers/table/row-info.vue";

const VIEW_CLASS = {
    default: "",
    active: "workers-table-row--active",
};

const CELLS_VIEW_CLASS = {
    default: "",
    gray: "workers-table-row__cells--gray",
};

export default {
    name: "WorkersTableRow",
    components: {
        WorkersTableStatus,
        WorkersTableHashrate,
        WorkersTableToolbar,
        WorkersTableRowInfo,
    },
    props: {
        worker: {
            type: Object,
            required: true,
        },
        workerIndex: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            toggle: false,
        };
    },
    computed: {
        getViewClass() {
            const classes = [];

            if (this.toggle) {
                classes.push(VIEW_CLASS.active);
            }

            return classes.join(" ");
        },

        getCellsViewClass() {
            return this.workerIndex % 2 === 0
                ? CELLS_VIEW_CLASS.gray
                : CELLS_VIEW_CLASS.default;
        },

        getCells() {
            const {hashCurrent, hash1Hour, stat24h, unitCurrent, unitHour} =
                this.worker;

            const {hashrate, rejectPercent, uptime} = stat24h;

            return [
                {
                    id: 0,
                    label: `${hashCurrent} ${unitCurrent}`,
                    class: "workers-table-row__cell--current",
                },
                {
                    id: 1,
                    label: `${hash1Hour} ${unitHour}`,
                    class: "workers-table-row__cell--hashrate-1h",
                },
                {
                    id: 2,
                    label: `${hashrate} Th`,
                    class: "workers-table-row__cell--hashrate-24h",
                },
                {
                    id: 3,
                    label: `${rejectPercent} %`,
                    class: "workers-table-row__cell--reject-rate",
                },
                // {
                //     id: 4,
                //     label: `${uptime} %`,
                //     class: "workers-table-row__cell--uptime",
                // },
            ];
        },

        getInfoIsShow() {
            return this.toggle;
        },
    },
    methods: {
        onRemove() {
            this.$emit("remove", this.worker);
        },

        onToggle() {
            this.toggle = !this.toggle;
        },

        onWorkers(workers) {
            this.$emit("workers", workers);
        },

        closeMinerTagModal() {
            this.$emit("closeMinerTagModal")
        }
    },
};
</script>

<style lang="scss">
.workers-table-row {
    border-left: 2px solid transparent;
    transition: $transition;

    .workers-table-row__cells {
        display: grid;
        align-items: center;
        grid-template-columns: 30px 400px 1fr 1fr 1fr 1fr 109px;
        padding: 12px 0;
        border-radius: 10px;
    }

    .workers-table-row__cells--gray {
        background: $bg-gray-light;
    }

    .workers-table-row__cell {
        padding: 0 12px;
    }

    .workers-table-row__cell-label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 1440px) {
    .workers-table-row {
        .workers-table-row__cells {
            grid-template-columns: 30px 350px 1fr 1fr 1fr 109px;
        }

        .workers-table-row__cell--uptime,
        .workers-table-row__cell--reject-rate {
            display: none;
        }
    }
}

@media screen and (max-width: 1220px) {
    .workers-table-row {
        .workers-table-row__cells {
            grid-template-columns: 30px 350px 1fr 1fr 109px;
        }

        .workers-table-row__cell--hashrate-1h {
            display: none;
        }
    }
}

@media screen and (max-width: 1024px) {
    .workers-table-row {
        .workers-table-row__cells {
            grid-template-columns: 30px 250px 1fr 1fr 37px;
        }
    }
}

@media screen and (max-width: 768px) {
    .workers-table-row {
        &.workers-table-row--active {
            border-color: $main;
        }

        .workers-table-row__cells {
            grid-template-columns: 24px 130px 1fr 1fr 29px;
            border-radius: 0;
        }

        .workers-table-row__cells--gray {
            background: none;
        }

        .workers-table-row__cell {
            padding: 0 8px;
        }
    }
}
</style>
