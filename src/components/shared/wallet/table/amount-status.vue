<template>
    <div class="wallet-table-amount-status">
        <div class="wallet-table-amount-status__groups">
            <div class="wallet-table-amount-status__group">
                <p
                    class="wallet-table-amount-status__amount"
                    :class="getFromAmountViewClass"
                >
                    {{ getFromAmount }}
                </p>

                <p class="wallet-table-amount-status__currency">
                    {{ getFromCurrency }}
                </p>
            </div>

            <UISvg
                class="wallet-table-amount-status__icon"
                v-if="getIconIsShow"
                icon="chevronRight"
            />

            <div class="wallet-table-amount-status__group" v-if="getGroupToIsShow">
                <p class="wallet-table-amount-status__amount">
                    {{ getToAmount }}
                </p>

                <p class="wallet-table-amount-status__currency">
                    {{ getToCurrency }}
                </p>
            </div>
        </div>

        <p
            class="wallet-table-amount-status__status"
            :class="getStatusViewClass"
        >
            {{ cell.status }}
        </p>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

import {TYPES} from "@/components/shared/wallet/table/row.vue";

const STATUS_VIEWS = {
    Failed: "wallet-table-amount-status__status--red",
    Success: "",
};

const AMOUNT_VIEWS = {
    from: "wallet-table-amount-status__amount--from",
};

export default {
    name: "WalletTableAmountStatus",
    components: {
        UISvg,
    },
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getFromAmount() {
            const {amount} = this.cell;

            return amount;
        },

        getToAmount() {
            const {amountTo} = this.cell;

            return amountTo;
        },

        getFromCurrency() {
            const {currency} = this.cell;

            return currency;
        },

        getToCurrency() {
            const {currencyTo} = this.cell;

            return currencyTo;
        },

        getFromAmountViewClass() {
            const {type} = this.cell;

            if (type === TYPES.withdrawal) {
                return AMOUNT_VIEWS.from;
            }

            return "";
        },

        getGroupToIsShow() {
            const {amountTo, currencyTo} = this.cell

            return amountTo && currencyTo
        },

        getStatusViewClass() {
            return STATUS_VIEWS[this.cell.status];
        },

        getIconIsShow() {
            return this.getToAmount && this.getToCurrency;
        },
    },
};
</script>

<style lang="scss">
.wallet-table-amount-status {
    @include golos-regular;
    padding: 0 30px;
    flex-direction: column;
    align-items: flex-end;
    grid-row-gap: 4px;

    .wallet-table-amount-status__groups {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-column-gap: 4px;
    }

    .wallet-table-amount-status__group {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-column-gap: 4px;
    }

    .wallet-table-amount-status__amount {
        color: $status-green;
        font-size: 14px;
        line-height: 17px;
    }

    .wallet-table-amount-status__amount--from {
        color: $status-red;
    }

    .wallet-table-amount-status__status {
        color: #222327;
        font-size: 14px;
        line-height: 17px;
    }

    .wallet-table-amount-status__currency {
        color: #9e9fa8;
        font-size: 14px;
        line-height: 17px;
    }
}

@media screen and (max-width: 768px) {
    .wallet-table-amount-status {
        padding: 0 16px;

        .wallet-table-amount-status__groups {
            flex-direction: column;
            align-items: flex-end;
            grid-row-gap: 4px;
        }

        .wallet-table-amount-status__amount,
        .wallet-table-amount-status__status,
        .wallet-table-amount-status__currency {
            font-size: 13px;
            line-height: 17px;
        }

        .wallet-table-amount-status__icon {
            transform: rotate(90deg);
        }
    }
}
</style>
