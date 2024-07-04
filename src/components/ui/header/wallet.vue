<template>
    <router-link class="ui-header-wallet" to="/wallet">
        <UISvg class="ui-header-wallet__icon" icon="wallet" />

        <div class="ui-header-wallet__group">
            <p
                class="ui-header-wallet__label"
                v-for="label in getLabels"
                :key="label.id"
            >
                {{ label.value }}

                <span class="ui-header-wallet__currency">
                    {{ label.currency }}
                </span>
            </p>
        </div>
    </router-link>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

import {getFixedUsdtValue, getFixedBtcValue} from "@/utils/functions.js";

export default {
    name: "UIHeaderWallet",
    components: {
        UISvg,
    },
    props: {
        balance: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getLabels() {
            const {totalBtc, totalUsdt} = this.balance;

            return [
                {
                    id: 0,
                    value: getFixedBtcValue(totalBtc),
                    currency: "BTC",
                },
                {
                    id: 1,
                    value: getFixedUsdtValue(totalUsdt),
                    currency: "USDT",
                },
            ].filter((item) => item.value);
        },
    },
};
</script>

<style lang="scss">
.ui-header-wallet {
    display: flex;
    align-items: center;
    grid-column-gap: 10px;
    padding: 4px 14px;
    border-radius: 10px;
    transition: $transition;

    &:hover {
        background: rgba(65, 92, 107, 0.1);

        .ui-header-wallet__icon path {
            fill: $main;
            fill-opacity: 1;
        }
    }

    .ui-header-wallet__group {
        display: flex;
        align-items: center;
        grid-column-gap: 20px;
    }

    .ui-header-wallet__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .ui-header-wallet__currency {
        color: #aabbc5;
    }
}
</style>
