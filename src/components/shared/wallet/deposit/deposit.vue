<template>
    <UIModal class="wallet-deposit" padding="109" @close="onClose">
        <div class="wallet-deposit__content">
            <h2 class="wallet-deposit__title">Deposit</h2>

            <WalletDepositForm
                :form="form"
                :currency="currency"
                :network="network"
                :loading="loading"
                @network="onChangeNetwork"
            />
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import WalletDepositForm from "@/components/shared/wallet/deposit/form.vue";

import {COMPONENTS} from "@/components/shared/wallet/content/content.vue";

import Api from "@/api/api.js";

const api = new Api();

export default {
    name: "WalletDeposit",
    components: {
        UIModal,
        WalletDepositForm,
    },
    props: {
        currency: {
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
                addressTag: "",
                url: "",
            },
            network: [],
            loading: false,
        };
    },
    created() {
        this.onNetwork();
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

        async onChangeNetwork(network) {
            try {
                this.loading = true;

                this.form.network = network;
                this.form.address = "";
                (this.form.addressTag = ""), (this.form.url = "");

                await api
                    .deposit(this.form.wallet, network)
                    .then(({address, addressTag, url}) => {
                        this.form.address = address;
                        this.form.addressTag = addressTag;
                        this.form.url = url;

                        this.loading = false;
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
.wallet-deposit {
    .wallet-deposit__content {
        width: 640px;
        padding: 42px 100px 84px 100px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 32px;
    }

    .wallet-deposit__title {
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .wallet-deposit {
        .wallet-deposit__content {
            width: 360px;
            padding: 32px 0 24px 0;
            margin: 0 auto;
            grid-row-gap: 24px;
        }

        .wallet-deposit__title {
            font-size: 24px;
            line-height: 29px;
        }
    }
}
</style>
