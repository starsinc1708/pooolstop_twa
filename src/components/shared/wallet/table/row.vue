<template>
    <div class="wallet-table-row">
        <component
            class="wallet-table-row__cell"
            v-for="cell in getCells"
            :key="cell.id"
            :is="cell.component"
            :class="cell.class"
            :cell="cell"
        />
    </div>
</template>

<script>
import WalletTableCell from "@/components/shared/wallet/table/cell.vue";
import WalletTableAmount from "@/components/shared/wallet/table/amount.vue";
import WalletTableCurrency from "@/components/shared/wallet/table/currency.vue";
import WalletTableStatus from "@/components/shared/wallet/table/status.vue";
import WalletTableDateType from "@/components/shared/wallet/table/date-type.vue";
import WalletTableAmountStatus from "@/components/shared/wallet/table/amount-status.vue";

import {getCapitalizeFirstLetter} from "@/utils/functions.js";

const CELLS = {
    default: WalletTableCell,
    amount: WalletTableAmount,
    currency: WalletTableCurrency,
    status: WalletTableStatus,
    dateType: WalletTableDateType,
    amountStatus: WalletTableAmountStatus,
};

export const TYPES = {
    withdrawal: "withdrawal",
};

export default {
    name: "WalletTableRow",
    components: {
        WalletTableCell,
        WalletTableAmount,
        WalletTableCurrency,
        WalletTableStatus,
        WalletTableDateType,
        WalletTableAmountStatus,
    },
    props: {
        row: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getCells() {
            const {
                date,
                type,
                amount,
                amountTo,
                currency,
                currencyTo,
                status,
                info,
            } = this.row;

            const newStatus = getCapitalizeFirstLetter(status);

            return [
                {
                    id: 0,
                    label: date,
                    class: "wallet-table-row__cell--date",
                    component: CELLS.default,
                },
                {
                    id: 1,
                    label: getCapitalizeFirstLetter(type),
                    class: "wallet-table-row__cell--type",
                    component: CELLS.default,
                },
                {
                    id: 2,
                    amount,
                    amountTo,
                    type,
                    class: "wallet-table-row__cell--amount",
                    component: CELLS.amount,
                },
                {
                    id: 3,
                    currency,
                    currencyTo,
                    class: "wallet-table-row__cell--currency",
                    component: CELLS.currency,
                },
                {
                    id: 4,
                    label: newStatus,
                    class: "wallet-table-row__cell--status",
                    component: CELLS.status,
                },
                {
                    id: 5,
                    date: date,
                    type,
                    class: "wallet-table-row__cell--date-type",
                    component: CELLS.dateType,
                },
                {
                    id: 6,
                    amount,
                    amountTo,
                    currency,
                    currencyTo,
                    status: newStatus,
                    type,
                    class: "wallet-table-row__cell--amount-status",
                    component: CELLS.amountStatus,
                },
                {
                    id: 7,
                    label: info,
                    class: "wallet-table-row__cell--info",
                    component: CELLS.default,
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.wallet-table-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 12px 0;
    width: 100%;
    border-radius: 10px;

    &:nth-child(2n) {
        background: $bg-gray-light;
    }

    .wallet-table-row__cell--date-type,
    .wallet-table-row__cell--amount-status {
        display: none;
    }
}

@media screen and (max-width: 1024px) {
    .wallet-table-row {
        grid-template-columns: repeat(2, 1fr);

        .wallet-table-row__cell--date,
        .wallet-table-row__cell--type,
        .wallet-table-row__cell--amount,
        .wallet-table-row__cell--currency,
        .wallet-table-row__cell--status {
            display: none;
        }

        .wallet-table-row__cell--date-type,
        .wallet-table-row__cell--amount-status {
            display: flex;
        }
    }
}

@media screen and (max-width: 768px) {
    .wallet-table-row {
        padding: 13px 0;
        border-radius: 0;
    }
}
</style>
