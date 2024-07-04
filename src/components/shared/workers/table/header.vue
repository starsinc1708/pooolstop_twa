<template>
    <div class="workers-table-header">
        <div
            class="workers-table-header__column"
            v-for="column in getColumns"
            :key="column.id"
            :class="column.class"
        >
            <p class="workers-table-header__label">
                {{ column.label }}
            </p>

            <p
                class="workers-table-header__label workers-table-header__label--small"
                v-if="column.labelSmall"
            >
                {{ column.labelSmall }}
            </p>

            <UIButton
                class="workers-table-header__sort"
                :class="onSortViewClass(column)"
                v-if="column.sort"
                icon="sort"
                @clicked="onSort(column)"
            />
        </div>
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

const SORT_VIEWS = {
    default: "",
    active: "workers-table-header__sort--active",
};

export default {
    name: "WorkersTableHeader",
    components: {
        UIButton,
    },
    props: {
        sort: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getColumns() {
            return [
                {
                    id: 0,
                    class: "workers-table-header__column--status",
                },
                {
                    id: 1,
                    label: "Worker Name",
                    labelSmall: "Worker",
                    sort: true,
                    class: "workers-table-header__column--worker-name",
                    key: "name",
                },
                {
                    id: 2,
                    label: "Current",
                    labelSmall: "Current",
                    sort: true,
                    class: "workers-table-header__column--current",
                    key: "hashCurrent",
                },
                {
                    id: 3,
                    label: "Hashrate / 1h",
                    sort: true,
                    class: "workers-table-header__column--hashrate-1h",
                    key: "hash1Hour",
                },
                {
                    id: 3,
                    label: "Hashrate / 24h",
                    labelSmall: "24h",
                    sort: true,
                    class: "workers-table-header__column--hashrate-24h",
                    key: "stat24h.hashrate",
                },
                {
                    id: 5,
                    label: "Avg. Reject rate / 24h",
                    sort: true,
                    class: "workers-table-header__column--reject-rate",
                    key: "stat24h.rejectPercent",
                },
                // {
                //     id: 6,
                //     label: "Uptime / 24h, %",
                //     sort: true,
                //     class: "workers-table-header__column--uptime",
                //     key: "stat24h.uptime",
                // },
                {
                    id: 7,
                    label: "",
                    class: "workers-table-header__column--toolbar",
                },
            ];
        },
    },
    methods: {
        onSort(column) {
            this.$emit("sort", column);
        },

        onSortViewClass({key}) {
            return this.sort[key] ? SORT_VIEWS.active : SORT_VIEWS.default;
        },
    },
};
</script>

<style lang="scss">
.workers-table-header {
    background: $bg-gray;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 30px 400px 1fr 1fr 1fr 1fr 109px;
    padding: 10px 0;

    .workers-table-header__column {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
        padding: 0 12px;
    }

    .workers-table-header__label {
        @include golos-semi-bold;
        font-weight: 600;
        font-size: 12px;
        line-height: 17px;
        align-items: center;
        text-transform: uppercase;
        color: $txt-main;
        white-space: nowrap;
    }

    .workers-table-header__label--small {
        display: none;
    }

    .workers-table-header__sort {
        fill: $black;
    }

    .workers-table-header__sort--active {
        fill: $main;
    }
}

@media screen and (max-width: 1440px) {
    .workers-table-header {
        grid-template-columns: 30px 350px 1fr 1fr 1fr 109px;

        .workers-table-header__column--uptime,
        .workers-table-header__column--reject-rate {
            display: none;
        }
    }
}

@media screen and (max-width: 1220px) {
    .workers-table-header {
        grid-template-columns: 30px 350px 1fr 1fr 109px;

        .workers-table-header__column--hashrate-1h {
            display: none;
        }
    }
}

@media screen and (max-width: 1024px) {
    .workers-table-header {
        grid-template-columns: 30px 250px 1fr 1fr 37px;

        .workers-table-header__label {
            display: none;
        }

        .workers-table-header__label--small {
            display: inline-block;
        }
    }
}

@media screen and (max-width: 768px) {
    .workers-table-header {
        padding: 15px 0;
        border-radius: 0;
        grid-template-columns: 24px 130px 1fr 1fr 29px;

        .workers-table-header__column {
            padding: 0 8px;
        }

        .workers-table-header__label {
            font-size: 10px;
            line-height: 13px;
        }

        .workers-table-header__sort {
            display: none;
        }
    }
}
</style>
