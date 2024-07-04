<template>
    <div class="settings-other-payouts">
        <h2 class="settings-other-payouts__title">Payouts</h2>

        <SettingsOtherAddress
            class="settings-other-payouts__address"
            :loading="loading"
            @loading="onChangeLoading"
        />

        <SettingsOtherPayout
            class="settings-other-payouts__payout"
            :loading="loading"
        />

        <SettingsOtherCurrency :loading="loading" @loading="onChangeLoading" />
    </div>
</template>

<script>
import SettingsOtherAddress from "@/components/shared/settings/other/address.vue";
import SettingsOtherPayout from "@/components/shared/settings/other/payout.vue";
import SettingsOtherCurrency from "@/components/shared/settings/other/currency.vue";

export default {
    name: "SettingsOtherPayouts",
    components: {
        SettingsOtherAddress,
        SettingsOtherPayout,
        SettingsOtherCurrency,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onChangeLoading(loading) {
            this.$emit("loading", loading);
        },
    },
};
</script>

<style lang="scss">
.settings-other-payouts {
    .settings-other-payouts__title {
        @include golos-semi-bold;
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
        margin-bottom: 32px;
    }

    .settings-other-payouts__address {
        margin-bottom: 24px;
    }

    .settings-other-payouts__payout {
        margin-bottom: 16px;
    }
}

@media screen and (max-width: 768px) {
    .settings-other-payouts {
        .settings-other-payouts__title {
            font-size: 24px;
            line-height: 29px;
            margin: 0 0 24px 4px;
        }
    }
}
</style>
