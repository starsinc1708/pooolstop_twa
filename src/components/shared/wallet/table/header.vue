<template>
    <div class="wallet-table-header">
        <div
            class="wallet-table-header__column"
            v-for="column in getColumns"
            :key="column.id"
            :class="column.class"
        >
            <p class="wallet-table-header__label">
                {{ column.label }}
            </p>

            <p
                class="wallet-table-header__label wallet-table-header__label--responsive"
                v-if="column.labelResponsive"
            >
                {{ column.labelResponsive }}
            </p>

            <UIButton
                class="wallet-table-header__sort"
                :class="onSortViewClass(column)"
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
    active: "wallet-table-header__sort--active",
};

export default {
    name: "WalletTableHeader",
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
                    label: "Date",
                    labelResponsive: "Date / Type",
                    class: "wallet-table-header__column--date",
                    key: "date",
                },
                {
                    id: 1,
                    label: "Type",
                    class: "wallet-table-header__column--type",
                    key: "type",
                },
                {
                    id: 2,
                    label: "Amount",
                    labelResponsive: "Amount / Status",
                    class: "wallet-table-header__column--amount",
                    key: "amount",
                },
                {
                    id: 3,
                    label: "Token",
                    class: "wallet-table-header__column--currency",
                    key: "currency",
                },
                {
                    id: 4,
                    label: "Status",
                    class: "wallet-table-header__column--status",
                    key: "status",
                },
                {
                    id: 5,
                    label: "Info",
                    class: "wallet-table-header__column--info",
                    key: "info",
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
.wallet-table-header {
    background: $bg-gray;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 10px 0;

    .wallet-table-header__column {
        padding: 0 30px;
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .wallet-table-header__label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
    }

    .wallet-table-header__label--responsive {
        display: none;
    }

    .wallet-table-header__sort {
        fill: $black;
    }

    .wallet-table-header__sort--active {
        fill: $main;
    }
}

@media screen and (max-width: 1024px) {
    .wallet-table-header {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .wallet-table-header__column--type,
        .wallet-table-header__column--currency,
        .wallet-table-header__column--status {
            display: none;
        }

        .wallet-table-header__column--amount {
            justify-content: flex-end;
        }

        .wallet-table-header__label {
            display: none;
        }

        .wallet-table-header__label--responsive {
            display: block;
        }

        .wallet-table-header__sort {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .wallet-table-header {
        border-radius: 0;
        padding: 13px 0;

        .wallet-table-header__column {
            padding: 0 16px;
        }

        .wallet-table-header__label {
            font-size: 10px;
            line-height: 16px;
        }
    }
}
</style>
