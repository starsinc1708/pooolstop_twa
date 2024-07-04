<template>
    <div class="wallet-withdraw-form">
        <div class="wallet-withdraw-form__fields">
            <UISelect
                class="wallet-withdraw-form__network"
                label="Select network"
                :full="true"
                :value="form.network"
                :options="getNetworkOptions"
                :disabled="getNetworkDisabled"
                @option="onChangeNetwork"
            />

            <UIInput
                class="wallet-withdraw-form__address"
                label="Wallet address"
                placeholder="Enter wallet address"
                :full="true"
                :value="form.address"
                :disabled="getDisabled"
                @changed="onChangeAddress"
            />

            <UIInput
                class="wallet-withdraw-form__address"
                v-if="getTagIsShow"
                label="Tag"
                placeholder="Enter tag"
                :full="true"
                :value="form.addressTag"
                :disabled="getDisabled"
            />

            <UIAmount
                class="wallet-withdraw-form__amount"
                label="Transfer amount"
                placeholder="Enter amount"
                :max="true"
                :min="true"
                :full="true"
                :value="form.amount"
                :disabled="getDisabled"
                :fixed="true"
                :length="getAmountLength"
                @changed="onChangeAmount"
                @max="onChangeAmountMax"
                @min="onChangeAmountMin"
            />
        </div>

        <WalletWithdrawResults :form="form" />

        <UIButton
            label="Withdraw"
            view="main"
            :full="true"
            :disabled="getWithdrawDisabled"
            @clicked="onWithdraw"
        />
    </div>
</template>

<script>
import UISelect from "@/components/ui/select/select.vue";
import UIInput from "@/components/ui/input/input.vue";
import UIAmount from "@/components/ui/amount/amount.vue";
import WalletWithdrawResults from "@/components/shared/wallet/withdraw/results.vue";
import UIButton from "@/components/ui/button/button.vue";

import {COINS} from "@/components/shared/wallet/withdraw/withdraw.vue";

import {
    DEFAULT_BTC_FIXED_VALUE,
    DEFAULT_USDT_FIXED_VALUE,
} from "@/utils/constants";

export default {
    name: "WalletWithdrawForm",
    components: {
        UISelect,
        UIInput,
        UIAmount,
        WalletWithdrawResults,
        UIButton,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
        network: {
            type: Array,
            default: () => [],
        },
        currency: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
        wallet: {
            type: Object,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getNetworkDisabled() {
            return !this.network.length || this.loading;
        },

        getMaxAmount() {
            const {btc, usdt} = this.wallet;
            const {wallet} = this.form;

            switch (wallet) {
                case COINS.btc:
                    return btc;
                case COINS.usdt:
                    return usdt;
                default:
                    return "";
            }
        },

        getWithdrawDisabled() {
            const {wallet, network, address, amount, withdrawMin} = this.form;
            const {login} = this.user;

            return (
                !wallet ||
                !network ||
                !login ||
                !address ||
                !amount ||
                +amount < +withdrawMin ||
                +amount > +this.getMaxAmount ||
                this.loading
            );
        },

        getNetworkOptions() {
            return this.network.map((network, networkIndex) => {
                return {
                    id: networkIndex,
                    label: network.name,
                    value: network.network,
                    ...network,
                };
            });
        },

        getTagIsShow() {
            const {addressTag} = this.form;

            return addressTag;
        },

        getAmountLength() {
            const {wallet} = this.form;

            switch (wallet) {
                case COINS.btc:
                    return DEFAULT_BTC_FIXED_VALUE;
                case COINS.usdt:
                    return DEFAULT_USDT_FIXED_VALUE;
                default:
                    return 0;
            }
        },
    },
    methods: {
        onChangeNetwork(network) {
            this.$emit("network", network);
        },

        onChangeAddress(address) {
            this.$emit("address", address);
        },

        onChangeAmount(amount) {
            this.$emit("amount", amount);
        },

        onChangeAmountMax() {
            let {btc, usdt} = this.wallet;
            if (btc && btc > 0) btc = Math.floor(btc * 100000000) / 100000000
            if (usdt && usdt > 0) usdt = Math.floor(usdt * 100) / 100
            const {wallet} = this.form;

            switch (wallet) {
                case COINS.btc:
                    this.onChangeAmount(btc);

                    break;
                case COINS.usdt:
                    this.onChangeAmount(usdt);

                    break;
                default:
                    break;
            }
        },

        onChangeAmountMin() {
            const {withdrawMin} = this.form;

            this.onChangeAmount(withdrawMin);
        },

        onWithdraw() {
            this.$emit("withdraw");
        },
    },
};
</script>

<style lang="scss">
.wallet-withdraw-form {
    display: flex;
    flex-direction: column;
    grid-row-gap: 16px;

    .wallet-withdraw-form__fields {
        display: flex;
        flex-direction: column;
        grid-row-gap: 10px;
    }
}

@media screen and (max-width: 768px) {
    .wallet-withdraw-form {
        .wallet-withdraw-form__method {
            display: none;
        }
    }
}
</style>
