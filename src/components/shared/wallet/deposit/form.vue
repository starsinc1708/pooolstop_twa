<template>
    <div class="wallet-deposit-form">
        <UISelect
            label="Select network"
            :full="true"
            :value="form.network"
            :options="getNetworkOptions"
            :disabled="getNetworkDisabled"
            @option="onChangeNetwork"
        />

        <UIWallet label="Wallet address" :value="form.address" />

        <WalletDepositField label="Tag" :value="form.addressTag" />

        <!-- <WalletDepositField label="Url" :value="form.url" /> -->
    </div>
</template>

<script>
import UISelect from "@/components/ui/select/select.vue";
import UIWallet from "@/components/ui/wallet/wallet.vue";
import WalletDepositField from "@/components/shared/wallet/deposit/field.vue";

export default {
    name: "WalletDepositForm",
    components: {
        UISelect,
        UIWallet,
        WalletDepositField,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
        currency: {
            type: Object,
            required: true,
        },
        network: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getNetworkDisabled() {
            return !this.network.length || this.loading;
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
    },
    methods: {
        onChangeNetwork({value}) {
            this.$emit("network", value);
        },
    },
};
</script>

<style lang="scss">
.wallet-deposit-form {
    display: flex;
    flex-direction: column;
    grid-row-gap: 10px;
}
</style>
