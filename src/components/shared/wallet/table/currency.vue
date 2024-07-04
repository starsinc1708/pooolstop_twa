<template>
    <div class="wallet-table-currency" :class="getViewClass">
        <p class="wallet-table-currency__label">
            {{ getFromCurrency }}
        </p>

        <UISvg
            class="wallet-table-currency__icon"
            v-if="getIconIsShow"
            icon="chevronRight"
        />

        <p class="wallet-table-currency__label" v-if="getLabelToIsShow">
            {{ getToCurrency }}
        </p>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const VIEWS = {
    default: "",
    start: "wallet-table-currency--start",
};

export default {
    name: "WalletTableCurrency",
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
        getViewClass() {
            return this.getToCurrency ? VIEWS.default : VIEWS.start
        },

        getFromCurrency() {
            const {currency} = this.cell;

            return currency;
        },

        getIconIsShow() {
            return this.getToCurrency;
        },

        getLabelToIsShow() {
            return this.getToCurrency;
        },

        getToCurrency() {
            const {currencyTo} = this.cell;

            return currencyTo;
        },
    },
};
</script>

<style lang="scss">
.wallet-table-currency {
    padding: 0 30px;
    display: flex;
    align-items: center;
    grid-column-gap: 8px;

    &.wallet-table-currency--start {
        align-items: flex-start;
    }

    .wallet-table-currency__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        text-transform: uppercase;
    }
}
</style>
