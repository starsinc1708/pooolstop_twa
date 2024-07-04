<template>
    <div class="settings-other-currency">
        <UIDropdown
            class="settings-other-currency__dropdown"
            label="Minimum Value"
            :options="getOptions"
            :option="currency"
            :value="value"
            :full="true"
            :disabled="getDisabled"
            @option="onChangeCurrency"
            @changed="onChangeValue"
        />

        <UIButton
            class="settings-other-currency__change"
            label="Change"
            view="main-outline"
            size="small"
            :disabled="getDisabled"
            @clicked="onChange"
        />
    </div>
</template>

<script>
import UIDropdown from "@/components/ui/dropdown/dropdown.vue";
import UIButton from "@/components/ui/button/button.vue";

const CURRENCIES = {
    btc: "btc",
    usdt: "usdt",
};

export default {
    name: "SettingsOtherCurrency",
    components: {
        UIDropdown,
        UIButton,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            currency: CURRENCIES.btc,
            value: "",
        };
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getOptions() {
            return [
                {
                    id: 0,
                    label: "BTC",
                    icon: "bitcoinSmall",
                    value: CURRENCIES.btc,
                },
                {
                    id: 1,
                    label: "USDT",
                    icon: "teatherSmall",
                    value: CURRENCIES.usdt,
                },
            ];
        },
    },
    methods: {
        onChangeCurrency({value}) {
            this.currency = value;
        },

        onChangeValue(value) {
            this.value = value;
        },

        onChange() {
            console.log("CHANGE");
        },
    },
};
</script>

<style lang="scss">
.settings-other-currency {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;

    .settings-other-currency__dropdown {
        max-width: 340px;
    }

    .settings-other-currency__change {
        margin-bottom: 3px;
    }
}

@media screen and (max-width: 768px) {
    .settings-other-currency {
        .settings-other-currency__dropdown {
            max-width: 230px;
        }
    }
}
</style>
