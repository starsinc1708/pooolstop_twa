<template>
    <div class="wallet-header">
        <WalletHeaderCard :wallet="wallet" />

        <div class="wallet-header__block">
            <div class="wallet-header__currency">
                <UICurrency
                    :currency="getBtc"
                    @deposit="onDeposit"
                    @withdraw="onWithdraw"
                />

                <WalletHeaderSwap
                    class="wallet-header__swap wallet-header__swap--one"
                    @swap="onSwap"
                />

                <UICurrency
                    :currency="getUsdt"
                    @deposit="onDeposit"
                    @withdraw="onWithdraw"
                />
            </div>

            <WalletHeaderSwap
                class="wallet-header__swap wallet-header__swap--two"
                @swap="onSwap"
            />
        </div>
    </div>
</template>

<script>
import WalletHeaderCard from "@/components/shared/wallet/header/card.vue";
import UICurrency from "@/components/ui/currency/currency.vue";
import WalletHeaderSwap from "@/components/shared/wallet/header/swap.vue";

import {COMPONENTS} from "@/components/shared/wallet/content/content.vue";

import {getFixedBtcValue, getFixedUsdtValue} from "@/utils/functions.js";

export const COINS = {
    btc: "BTC",
    usdt: "USDT",
};

export default {
    name: "WalletHeader",
    components: {
        WalletHeaderCard,
        UICurrency,
        WalletHeaderSwap,
    },
    props: {
        wallet: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getBtc() {
            const {btc} = this.wallet;

            return {
                coin: COINS.btc,
                amount: getFixedBtcValue(btc),
            };
        },

        getUsdt() {
            const {usdt} = this.wallet;

            return {
                coin: COINS.usdt,
                amount: getFixedUsdtValue(usdt),
            };
        },
    },
    methods: {
        onDeposit(deposit) {
            this.$emit("deposit", deposit);
        },

        onWithdraw(withdraw) {
            this.$emit("withdraw", withdraw);
        },

        onSwap() {
            this.$emit("component", COMPONENTS.swap);
        },
    },
};
</script>

<style lang="scss">
.wallet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .wallet-header__currency {
        display: flex;
        align-items: center;
        grid-column-gap: 16px;
    }

    .wallet-header__swap--two {
        display: none;
    }
}

@media screen and (max-width: 1440px) {
    .wallet-header {
        flex-direction: column;
        align-items: flex-center;
        grid-row-gap: 4px;

        .wallet-header__block {
            display: flex;
            align-items: center;
            grid-column-gap: 14px;
        }
    }
}

@media screen and (max-width: 1024px) {
    .wallet-header {
        .wallet-header__currency {
            align-items: normal;
            flex-direction: column;
            grid-row-gap: 4px;
        }

        .wallet-header__swap--one {
            display: none;
        }

        .wallet-header__swap--two {
            display: flex;
        }
    }
}


@media screen and (max-width: 768px) {
    .wallet-header {
        padding: 8px 8px 0 8px;
    }
}
</style>
