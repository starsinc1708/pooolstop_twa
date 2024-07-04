<template>
    <div class="dashboard-income-table-row" :class="getViewClass">
        <div class="dashboard-income-table-row__cells">
            <div
                class="dashboard-income-table-row__cell"
                v-for="cell in getCells"
                :key="cell.id"
                :class="cell.class"
            >
                <p
                    class="dashboard-income-table-row__label dashboard-income-table-row__label--date"
                >
                    {{ cell.label }}
                </p>

                <p class="dashboard-income-table-row__value" v-if="cell.value">
                    {{ cell.value }}
                </p>
            </div>

            <button
                class="dashboard-income-table-row__toggle"
                @click="onToggle"
            >
                <UISvg
                    class="dashboard-income-table-row__toggle-icon"
                    :class="getToggleIconViewClass"
                    icon="chevronDown"
                />
            </button>
        </div>

        <DashboardIncomeDifficulty
            class="dashboard-income-table-row__difficulty"
            v-if="getDifficulty"
            :difficulty="getDifficulty"
        />

        <DashboardIncomeTableRowInfo v-if="getRowInfoIsShow" :row="row" />
    </div>
</template>

<script>
import {getDate} from "@/utils/functions.js";

import UISvg from "@/components/ui/svg/svg.vue";
import DashboardIncomeTableRowInfo from "@/components/shared/dashboard/income/table-row-info.vue";
import DashboardIncomeDifficulty from "@/components/shared/dashboard/income/difficulty.vue";

import {CONTENT_VIEWS} from "@/components/shared/dashboard/income/difficulty.vue";

const VIEW_CLASS = {
    default: "",
    active: "dashboard-income-table-row--active",
};

const TOGGLE_ICON_VIEW_CLASS = {
    default: "",
    active: "dashboard-income-table-row__toggle-icon--active",
};

const DEFAULT_ROW_STEP = 1;
const MAX_PERCENT = 100;
const DEFAULT_FIXED_VALUE = 2;

export default {
    name: "DashboardIncomeTableRow",
    components: {
        UISvg,
        DashboardIncomeTableRowInfo,
        DashboardIncomeDifficulty,
    },
    props: {
        row: {
            type: Object,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        rows: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            toggle: false,
        };
    },
    computed: {
        getViewClass() {
            return this.toggle ? VIEW_CLASS.active : VIEW_CLASS.default;
        },

        getDifficulty() {
            const nextRow = this.rows[this.rowIndex + DEFAULT_ROW_STEP];

            if (nextRow) {
                const currentDifficulty = this.row.difficulty;
                const nextDifficulty = nextRow.difficulty;

                const difficulty = (
                    (currentDifficulty / nextDifficulty) *
                    MAX_PERCENT
                ).toFixed(DEFAULT_FIXED_VALUE);

                if (currentDifficulty > nextDifficulty) {
                    const finalDifficulty = -(MAX_PERCENT - difficulty).toFixed(
                        DEFAULT_FIXED_VALUE
                    );

                    return {
                        difficulty: `+${finalDifficulty}`,
                        view: CONTENT_VIEWS.red,
                    };
                }

                if (currentDifficulty < nextDifficulty) {
                    const finalDifficulty = (difficulty - MAX_PERCENT).toFixed(
                        DEFAULT_FIXED_VALUE
                    );

                    return {
                        difficulty: `${finalDifficulty}`,
                        view: CONTENT_VIEWS.green,
                    };
                }

                return false;
            }

            return false;
        },

        getCells() {
            const {day, amount, hashrate, bonus, rate, unit} = this.row;

            return [
                {
                    id: 0,
                    label: getDate(day, "DD.MM.YYYY"),
                    value: hashrate,
                    class: "dashboard-income-table-row__cell--date",
                    message: true,
                },
                {
                    id: 1,
                    label: hashrate + ' ' + unit,
                    class: "dashboard-income-table-row__cell--hashrate",
                },
                {
                    id: 2,
                    label: amount,
                    value: bonus,
                    class: "dashboard-income-table-row__cell--income",
                },
                {
                    id: 3,
                    label: bonus,
                    class: "dashboard-income-table-row__cell--bonus",
                },
                {
                    id: 3,
                    label: rate,
                    class: "dashboard-income-table-row__cell--rate",
                },
                // {
                //     id: 3,
                //     label: "???",
                //     class: "dashboard-income-table-row__cell--uptime",
                // },
            ];
        },

        getToggleIconViewClass() {
            return this.toggle
                ? TOGGLE_ICON_VIEW_CLASS.active
                : TOGGLE_ICON_VIEW_CLASS.default;
        },

        getRowInfoIsShow() {
            return this.toggle;
        },
    },
    methods: {
        onToggle() {
            this.toggle = !this.toggle;
        },
    },
};
</script>

<style lang="scss">
.dashboard-income-table-row {
    border-radius: 10px;
    transition: $transition;
    border-left: 2px solid transparent;
    position: relative;

    &:nth-child(2n) {
        background: #f7f9fa;
    }

    .dashboard-income-table-row__cells {
        display: grid;
        align-items: center;
        grid-template-columns: 230px 1fr 1fr 1fr 1fr;
        padding: 12px 0;
    }

    .dashboard-income-table-row__cell {
        padding: 0 30px;
    }

    .dashboard-income-table-row__label {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .dashboard-income-table-row__value {
        display: none;
    }

    .dashboard-income-table-row__toggle {
        display: none;
    }

    .dashboard-income-table-row__toggle-icon {
        fill: $txt-light;
        transition: $transition;
    }

    .dashboard-income-table-row__toggle-icon--active {
        transform: rotate(180deg);
        fill: $main;
    }

    .dashboard-income-table-row__difficulty {
        position: absolute;
        bottom: -8px;
        left: 118px;
        z-index: 100;
    }
}

@media screen and (max-width: 1440px) {
    .dashboard-income-table-row {
        .dashboard-income-table-row__cells {
            grid-template-columns: 230px 1fr 1fr 1fr;
        }

        .dashboard-income-table-row__cell--rate,
        .dashboard-income-table-row__cell--uptime {
            display: none;
        }
    }
}

@media screen and (max-width: 1024px) {
    .dashboard-income-table-row {
        .dashboard-income-table-row__cells {
            grid-template-columns: 230px 1fr 1fr;
        }

        .dashboard-income-table-row__cell--bonus {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .dashboard-income-table-row {
        border-radius: 0;

        &.dashboard-income-table-row--active {
            border-color: $main;
        }

        .dashboard-income-table-row__cells {
            grid-template-columns: 1fr 1fr 55px;
            padding: 9px 0;
        }

        .dashboard-income-table-row__cell {
            padding: 0 12px;
        }

        .dashboard-income-table-row__cell--hashrate,
        .dashboard-income-table-row__cell--bonus {
            display: none;
        }

        .dashboard-income-table-row__cell--income {
            text-align: end;
        }

        .dashboard-income-table-row__label {
            font-size: 12px;
            line-height: 12px;
        }

        .dashboard-income-table-row__label--date {
            color: $txt-light;
        }

        .dashboard-income-table-row__value {
            display: inline-block;
        }

        .dashboard-income-table-row__toggle {
            @include button-reset;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 12px;
        }

        .dashboard-income-table-row__difficulty {
            bottom: -8px;
            left: 83px;
        }
    }
}
</style>
