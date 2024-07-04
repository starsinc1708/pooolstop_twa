<template>
    <div class="wallet-table-amount" :class="getViewClass">
        <p class="wallet-table-amount__label" :class="getLabelFromViewClass">
            {{ getFromAmount }}
        </p>

        <UISvg
            class="wallet-table-amount__icon"
            v-if="getIconIsShow"
            icon="chevronRight"
        />

        <p
            class="wallet-table-amount__label wallet-table-amount__label--to"
            v-if="getToAmount"
        >
            {{ getToAmount }}
        </p>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

import {TYPES} from "@/components/shared/wallet/table/row.vue";

const VIEWS = {
    default: "",
    start: "wallet-table-amount--start",
};

const LABEL_VIEWS = {
    default: "",
    from: "wallet-table-amount__label--from",
};

export default {
    name: "WalletTableAmount",
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
        getIconIsShow() {
            return this.getToAmount;
        },

        getViewClass() {
            return this.getToAmount ? VIEWS.default : VIEWS.start;
        },

        getLabelFromViewClass() {
            const {type} = this.cell;

            if (type === TYPES.withdrawal || this.getToAmount) {
                return LABEL_VIEWS.from;
            }

            return LABEL_VIEWS.default;
        },

        getFromAmount() {
            const {amount} = this.cell;

            return amount;
        },

        getToAmount() {
            const {amountTo} = this.cell;

            return amountTo;
        },
    },
};
</script>

<style lang="scss">
.wallet-table-amount {
    padding: 0 30px;
    display: flex;
    align-items: center;
    grid-column-gap: 8px;

    &.wallet-table-amount--start {
        align-items: flex-start;
    }

    .wallet-table-amount__label {
        font-size: 14px;
        line-height: 17px;
        color: $status-green;
    }

    .wallet-table-amount__label--from {
        color: $status-red;
    }

    .wallet-table-amount__label--to {
        color: $status-green;
    }
}
</style>
