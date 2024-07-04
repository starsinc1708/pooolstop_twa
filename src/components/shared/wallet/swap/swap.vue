<template>
    <UIModal class="wallet-swap" @close="onClose">
        <div class="wallet-swap__content">
            <h2 class="wallet-swap__title">Swap Tokens</h2>

            <div class="wallet-swap__form">
                <WalletSwapForm v-if="!loading"
                    :form="form"
                    :pair="pair"
                    :type="type"
                    :min="getMin"
                    :loading="loading"
                    :to="toCurrency"
                    @amount="onChangeAmount"
                    @to="onChangeTo"
                    @swap="onSwapCurrency"
                />

                <WalletSwapResults :pair="pair" :min="getMin" :form="form" />

                <UIButton
                    :label="getSwapLabel"
                    view="main"
                    :full="true"
                    :disabled="getDisabled"
                    @clicked="onSwap"
                />
            </div>
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import UIButton from "@/components/ui/button/button.vue";
import WalletSwapForm from "@/components/shared/wallet/swap/form.vue";
import WalletSwapResults from "@/components/shared/wallet/swap/results.vue";

import {COMPONENTS} from "@/components/shared/wallet/content/content.vue";
import {COINS} from "@/components/shared/wallet/header/header.vue";

import {pairFactory} from "@/utils/factory.js";

import {
    DEFAULT_BTC_FIXED_VALUE,
    DEFAULT_USDT_FIXED_VALUE,
} from "@/utils/constants";

import Api from "@/api/api";

const api = new Api();

export const TYPES = {
    sell: "SELL",
    buy: "BUY",
};

const DEFAULT_USDT = 11;

const SWAP_TYPES = {
    success: "SUCCESS",
    progress: "ORDER_IN_PROGRESS"
};

export default {
    name: "WalletSwap",
    components: {
        UIModal,
        UIButton,
        WalletSwapForm,
        WalletSwapResults,
    },
    props: {
        wallet: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                from: {
                    coin: "",
                    available: "",
                },
                to: {
                    coin: "",
                    available: "",
                },
                amount: "",
            },
            pair: pairFactory(),
            type: TYPES.sell,
            loading: false,
            toCurrency: 0
        };
    },
    created() {
        this.onForm();
    },
    computed: {
        getSwapLabel() {
            const {from, to} = this.form;

            return `Swap ${from.coin.toLowerCase()} to ${to.coin.toLowerCase()}`;
        },

        getDisabled() {
            const {amount, from} = this.form;
            const {available} = from;

            return (
                !amount ||
                +amount < +this.getMin ||
                +amount > +available ||
                this.loading
            );
        },

        getMin() {
            const {lastTick} = this.pair;
            const {rate} = lastTick;
            switch (this.type) {
                case TYPES.buy:
                    return Math.ceil(DEFAULT_USDT * 100) / 100 + "";
                case TYPES.sell:
                    return Math.ceil(DEFAULT_USDT / rate * 1000000) / 1000000 + "";
                default:
                    return "";
            }
        },

        getAmount() {
            const {amount} = this.form;

            return amount;

            // if (this.type === TYPES.sell) {
            //     return amount;
            // }

            // return this.getToCurrency;
        },

        // getToCurrency() {
        //     const {amount} = this.form;
        //     const {rate} = this.pair.lastTick;
        //     switch (this.type) {
        //         case TYPES.buy:
        //             return amount
        //                 ? parseFloat(amount / rate).toFixed(
        //                       6
        //                   )
        //                 : "";
        //         case TYPES.sell:
        //             return amount
        //                 ? parseFloat(amount * rate).toFixed(
        //                       DEFAULT_USDT_FIXED_VALUE
        //                   )
        //                 : "";
        //         default:
        //             return "";
        //     }
        // },
    },
    methods: {
        async onForm() {
            try {
                this.loading = true;

                const {btc, usdt} = this.wallet;

                this.form.from.coin = COINS.btc;
                this.form.from.available = btc ? (+btc).toFixed(8) : btc;

                this.form.to.coin = COINS.usdt;
                this.form.to.available = usdt ? (+usdt).toFixed(2) : usdt;;

                await api
                    .pair({
                        base_currency: COINS.usdt,
                        currency: COINS.btc,
                    })
                    .then((pair) => {
                        this.pair = pair;

                        this.loading = false;
                    });
            } catch (e) {
                this.loading = false;
            }
        },

        onChangeAmount(amount, source) {
            const {rate} = this.pair.lastTick;
            if (source === 'min' || source === 'max') this.form.amount = amount
            if (this.type === TYPES.sell) this.toCurrency = Math.ceil(amount * rate * 100) / 100;
            if (this.type === TYPES.buy) this.toCurrency= Math.ceil(amount / rate * 100000000) / 100000000;
        },

        onChangeTo(amount, source) {
            const {rate} = this.pair.lastTick;
            if (this.type === TYPES.buy) this.form.amount = Math.ceil(amount * rate * 100) / 100;
            if (this.type === TYPES.sell) this.form.amount = Math.ceil(amount / rate * 100000000) / 100000000;
        },

        onSwapCurrency() {
            const {btc, usdt} = this.wallet;

            const {from} = this.form;

            if (from.coin === COINS.usdt) {
                this.form.from.coin = COINS.btc;
                this.form.from.available = btc ? (+btc).toFixed(8) : btc;

                this.form.to.coin = COINS.usdt;
                this.form.to.available = usdt ? (+usdt).toFixed(2) : usdt;

                this.type = TYPES.sell;
            } else {
                this.form.from.coin = COINS.usdt;
                this.form.from.available = usdt ? (+usdt).toFixed(2) : usdt;

                this.form.to.coin = COINS.btc;
                this.form.to.available = btc ? (+btc).toFixed(8) : btc;

                this.type = TYPES.buy;
            }

            this.form.amount = "";
        },

        onClose() {
            this.$emit("close", COMPONENTS.default);
        },

        async onSwap() {
            try {
                this.loading = true;

                const {id} = this.pair;
                const {amount} = this.form;

                await api
                    .convert({
                        id,
                        type: this.type,
                        amount: this.getAmount,
                    })
                    .then(async ({status}) => {
                        if (status === SWAP_TYPES.success) {
                            await api.balance().then(balance => {
                                this.$store.commit("setBalance", balance);
                            })
                            this.$emit("refresh");
                            this.onClose();
                        } 
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            } catch (e) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss">
.wallet-swap {
    .wallet-swap__content {
        padding: 48px 150px;
        width: 640px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 32px;
    }

    .wallet-swap__title {
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }

    .wallet-swap__form {
        display: flex;
        flex-direction: column;
        grid-row-gap: 16px;
    }
}

@media screen and (max-width: 768px) {
    .wallet-swap {
        .wallet-swap__content {
            width: 360px;
            padding: 32px 0 24px 0;
            margin: 0 auto;
            grid-row-gap: 24px;
        }

        .wallet-swap__title {
            font-size: 24px;
            line-height: 29px;
        }
    }
}
</style>
