<template>
    <div class="settings-other-swaps">
        <h2 class="settings-other-swaps__title">Auto Swaps</h2>

        <SettingsOtherAutoSwap
            class="settings-other-swaps__auto-swap"
            :autoSwap="autoSwap"
            :loading="loading"
            @autoSwap="onChangeAutoSwap"
        />

        <SettingsOtherAmount
            :autoSwap="autoSwap"
            :loading="loading"
            @loading="onChangeLoading"
        />
    </div>
</template>

<script>
import SettingsOtherAutoSwap from "@/components/shared/settings/other/auto-swap.vue";
import SettingsOtherAmount from "@/components/shared/settings/other/amount.vue";

export default {
    name: "SettingsOtherSwaps",
    components: {
        SettingsOtherAutoSwap,
        SettingsOtherAmount,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            autoSwap: false,
        };
    },
    methods: {
        onChangeAutoSwap(autoSwap) {
            this.autoSwap = autoSwap;
        },

        onChangeLoading(loading) {
            this.$emit("loading", loading);
        },
    },
};
</script>

<style lang="scss">
.settings-other-swaps {
    .settings-other-swaps__title {
        @include golos-semi-bold;
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
        margin-bottom: 32px;
    }

    .settings-other-swaps__auto-swap {
        margin-bottom: 16px;
    }
}

@media screen and (max-width: 1300px) {
    .settings-other-swaps {
        padding-bottom: 24px;
        border-bottom: 1px solid $gray;
    }
}

@media screen and (max-width: 768px) {
    .settings-other-swaps {
        .settings-other-swaps__title {
            font-size: 24px;
            line-height: 29px;
            margin: 0 0 24px 4px;
        }
    }
}
</style>
