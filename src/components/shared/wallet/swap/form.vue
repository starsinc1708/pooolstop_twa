<template>
    <div class="wallet-swap-form">
        <UIAmount
            :label="getAmountLabel"
            placeholder="Enter amount"
            :currency="getFromCurrency"
            :full="true"
            :max="true"
            :min="true"
            :value="form.amount"
            :disabled="getDisabled"
            :fixed="true"
            :length="getAmountLength"
            @changed="onChangeAmount"
            @min="onChangeAmountMin"
            @max="onChangeAmountMax"
        />

        <UIIcon icon="swap" :disabled="getDisabled" @clicked="onSwapCurrency" />

        <UIInputDefault 
            placeholder="You get" 
            :full="true" 
            :value="to" 
            @changed="onChangeTo" 
            :disabled="getDisabled"
            :fixed="getRevertAmountLength"
        />
    </div>
</template>

<script>
import UIAmount from "@/components/ui/amount/amount.vue";
import UIIcon from "@/components/ui/icon/icon.vue";
import UIInputDefault from "@/components/ui/input/default.vue";

import {TYPES} from "./swap.vue";

import {
    DEFAULT_BTC_FIXED_VALUE,
    DEFAULT_USDT_FIXED_VALUE,
} from "@/utils/constants.js";

export default {
    name: "WalletSwapForm",
    components: {
        UIAmount,
        UIIcon,
        UIInputDefault,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
        pair: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        min: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
    },
    computed: {
        getAmountLabel() {
            const {available, coin} = this.form.from;
            // const amount = coin === 'USDT' ? (+available).toFixed(2) : available;
            return `Available: ${available} ${coin}`;
        },

        getFromCurrency() {
            const {coin} = this.form.from;

            return coin;
        },

        getDisabled() {
            return this.loading;
        },

        getAmountLength() {
            switch (this.type) {
                case TYPES.buy:
                    return DEFAULT_USDT_FIXED_VALUE;
                case TYPES.sell:
                    return 6;
                default:
                    return 0;
            }
        },
        getRevertAmountLength() {
            switch (this.type) {
                case TYPES.buy:
                    return 6;
                case TYPES.sell:
                    return DEFAULT_USDT_FIXED_VALUE;
                default:
                    return 0;
            }
        },
    },
    methods: {
        onChangeAmount(amount, source) {
            this.$emit("amount", amount, source);
        },

        onChangeTo(amount, source) {
            this.$emit("to", amount, source);
        },

        onChangeAmountMin() {
            this.onChangeAmount(this.min, 'min');
        },

        onChangeAmountMax() {
            const {available, coin} = this.form.from;
            const amount = coin === 'USDT' ? this.truncateDecimal(+available, DEFAULT_USDT_FIXED_VALUE) : this.truncateDecimal(+available, 6);
            this.onChangeAmount(amount, 'max');
        },

        onSwapCurrency() {
            this.$emit("swap");
        },
        truncateDecimal (num, decimalPlaces) {
            const factor = Math.pow(10, decimalPlaces)
            return Math.trunc(num * factor) / factor
        }
    },
};
</script>

<style lang="scss">
.wallet-swap-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row-gap: 4px;
    width: 100%;
}
</style>
