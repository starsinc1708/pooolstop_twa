<template>
    <div class="settings-other-amount">
        <SettingsOtherAmountField
            :amount="amountOne"
            :disabled="getDisabled"
            @amount="onChangeAmount"
        />

        <UIIcon
            class="settings-other-amount__swap"
            icon="swap"
            :disabled="getDisabled"
            @clicked="onSwap"
        />

        <SettingsOtherAmountField
            :amount="amountTwo"
            :disabled="getDisabled"
            @amount="onChangeAmount"
        />
    </div>
</template>

<script>
import SettingsOtherAmountField from "@/components/shared/settings/other/amount-field.vue";
import UIIcon from "@/components/ui/icon/icon.vue";

const AMOUNTS = {
    one: "amountOne",
    two: "amountTwo",
};

export default {
    name: "SettingsOtherAmount",
    components: {
        SettingsOtherAmountField,
        UIIcon,
    },
    props: {
        autoSwap: {
            type: Boolean,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            amountOne: {
                currency: "BTC",
                value: 0,
                key: AMOUNTS.one,
            },
            amountTwo: {
                currency: "USDT",
                value: 0,
                key: AMOUNTS.two,
            },
        };
    },
    computed: {
        getDisabled() {
            return !this.autoSwap || this.loading;
        },
    },
    methods: {
        onChangeAmount({key, value}) {
            this[key].value = value;
        },

        onSwap() {
            console.log("SWAP");
        },
    },
};
</script>

<style lang="scss">
.settings-other-amount {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-row-gap: 4px;

    .settings-other-amount__swap {
        margin-left: 148px;
    }
}

@media screen and (max-width: 768px) {
    .settings-other-amount {
        .settings-other-amount__swap {
            margin-left: 93px;
        }
    }
}
</style>
