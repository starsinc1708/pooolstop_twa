<template>
    <div class="wallet-table">
        <h2 class="wallet-table__title">History</h2>

        <div class="detailed__checkbox">
            <UICheckbox :value="detailed" @changed="onChangeDetailed" :small="true"/><span class="detailed__label">Detailed</span>
        </div>
        <WalletTableHeader :sort="sort" @sort="onSort" />

        <WalletTableBody
            :transactions="getTransactions"
            :loading="loading"
            :show="show"
            @page="onChangePage"
        />
    </div>
</template>

<script>
import WalletTableHeader from "@/components/shared/wallet/table/header.vue";
import WalletTableBody from "@/components/shared/wallet/table/body.vue";
import UICheckbox from "@/components/ui/checkbox/checkbox.vue";

import {SORT_VALUES} from "@/utils/constants.js";
import {getSort} from "@/utils/functions";

export default {
    name: "WalletTable",
    components: {
        WalletTableHeader,
        WalletTableBody,
        UICheckbox
    },
    props: {
        transactions: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
        detailed: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            sort: {
                date: "desc",
                type: "",
                amount: "",
                currency: "",
                status: "",
            },
        };
    },
    computed: {
        getTransactions() {
            return getSort(this.sort, this.transactions);
        },
    },
    methods: {
        onSort({key}) {
            switch (this.sort[key]) {
                case SORT_VALUES.default:
                    this.sort[key] = SORT_VALUES.desc;
                    break;
                case SORT_VALUES.asc:
                    this.sort[key] = SORT_VALUES.asc;
                    break;
                case SORT_VALUES.desc:
                    this.sort[key] = SORT_VALUES.default;
                    break;
                default:
                    break;
            }
        },

        onChangePage() {
            this.$emit("page");
        },
        onChangeDetailed() {
            this.$emit("detailed");
        }
    },
};
</script>

<style lang="scss">
.wallet-table {
    .wallet-table__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
        margin-bottom: 4px;
    }
}

.detailed__checkbox {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 5px;
}

.detailed__label {
    margin-left: 2px;
}

@media screen and (max-width: 768px) {
    .wallet-table {
        .wallet-table__title {
            font-size: 24px;
            line-height: 29px;
            margin: 0 0 27px 16px;
        }
    }
}
</style>
