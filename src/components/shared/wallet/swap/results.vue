<template>
    <div class="wallet-swap-results">
        <div
            class="wallet-swap-results__result"
            v-for="result in getResults"
            :key="result.id"
        >
            <p class="wallet-swap-results__label">{{ result.label }}</p>

            <p class="wallet-swap-results__label">{{ result.value }}</p>
        </div>
    </div>
</template>

<script>
import {COINS} from "@/components/shared/wallet/header/header.vue";

import {
    DEFAULT_BTC_FIXED_VALUE,
    DEFAULT_USDT_FIXED_VALUE,
} from "@/utils/constants.js";

export default {
    name: "WalletSwapResults",
    props: {
        pair: {
            type: Object,
            required: true,
        },
        min: {
            type: String,
            required: true,
        },
        form: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getResults() {
            const {lastTick} = this.pair;
            const {rate} = lastTick;
            const {coin} = this.form.from;
            const min = this.min;

            const fixedRate = rate
                ? parseFloat(rate).toFixed(DEFAULT_USDT_FIXED_VALUE)
                : "";
            const fixedMin =
                coin === COINS.btc
                    ? parseFloat(min).toFixed(6)
                    : parseFloat(min).toFixed(DEFAULT_USDT_FIXED_VALUE);

            return [
                {
                    id: 0,
                    label: "Price BTC",
                    value: `${fixedRate} USDT`,
                },
                {
                    id: 1,
                    label: "Min",
                    value: `${fixedMin} ${coin}`,
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.wallet-swap-results {
    display: flex;
    flex-direction: column;
    grid-row-gap: 4px;

    .wallet-swap-results__result {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .wallet-swap-results__label {
        font-size: 12px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
