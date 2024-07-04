<template>
    <UIModal class="wallet-withdraw" padding="109" @close="onClose">
        <div class="wallet-withdraw__content">
            <h2 class="wallet-withdraw__title">Withdraw</h2>

            <WalletWithdrawForm
                :form="form"
                :loading="loading"
                :network="network"
                :currency="currency"
                :user="getUser"
                :wallet="wallet"
                @network="onChangeNetwork"
                @method="onChangeMethod"
                @address="onChangeAddress"
                @amount="onChangeAmount"
                @withdraw="onWithdraw"
            />
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import WalletWithdrawForm from "@/components/shared/wallet/withdraw/form.vue";

import {COMPONENTS} from "@/components/shared/wallet/content/content.vue";

import Api from "@/api/api";

const api = new Api();

const ZERO = 0;

export const COINS = {
    btc: "BTC",
    usdt: "USDT",
};

export default {
    name: "WalletWithdraw",
    components: {
        UIModal,
        WalletWithdrawForm,
    },
    props: {
        currency: {
            type: Object,
            required: true,
        },
        wallet: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                wallet: this.currency.coin,
                network: "",
                address: "",
                amount: "",
                addressTag: "",
                url: "",
                withdrawFee: "",
                withdrawMin: 0,
                id: null,
            },
            network: [],
            loading: false,
        };
    },
    created() {
        this.onNetwork();
    },
    computed: {
        getUser() {
            return this.$store.state.user;
        },
    },
    methods: {
        async onNetwork() {
            try {
                this.loading = true;

                await api.network(this.currency.coin).then((network) => {
                    this.network = network;

                    this.loading = false;
                });
            } catch (e) {
                this.loading = false;
            }
        },

        onChangeNetwork({network, withdrawFee, withdrawMin}) {
            this.form.address = "";
            this.form.network = network;
            this.form.withdrawFee = withdrawFee;
            this.form.withdrawMin = withdrawMin;
        },

        onChangeAddress(address) {
            this.form.address = address;
        },

        onChangeAmount(amount) {
            if (amount < ZERO) {
                this.form.amount = -amount.toString();
            } else {
                this.form.amount = amount.toString();
            }
        },

        async onWithdraw() {
            try {
                this.loading = true;

                const {wallet, amount, network, address} = this.form;
                const {login} = this.getUser;

                await api
                    .withdraw({
                        asset: wallet,
                        amount,
                        network,
                        address,
                        login,
                    })
                    .then((data) => {
                        this.loading = false;

                        this.form.id = data;

                        this.$emit("confirm", this.form);
                        this.$emit("component", COMPONENTS.confirm);
                    });
            } catch (e) {
                this.loading = false;
            }
        },

        onClose() {
            this.$emit("close", COMPONENTS.default);
        },
    },
};
</script>

<style lang="scss">
.wallet-withdraw {
    .wallet-withdraw__content {
        width: 640px;
        padding: 42px 100px 84px 100px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 32px;
    }

    .wallet-withdraw__title {
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .wallet-withdraw {
        .wallet-withdraw__content {
            width: 360px;
            padding: 32px 0 24px 0;
            margin: 0 auto;
            grid-row-gap: 24px;
        }

        .wallet-withdraw__title {
            font-size: 24px;
            line-height: 36px;
        }
    }
}
</style>
