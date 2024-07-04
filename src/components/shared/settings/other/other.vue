<template>
    <div class="settings-other">
        <SettingsOtherSwaps :loading="loading" @loading="onChangeLoading" />

        <SettingsOtherPayouts :loading="loading" @loading="onChangeLoading" />
    </div>
</template>

<script>
import SettingsOtherSwaps from "@/components/shared/settings/other/swaps.vue";
import SettingsOtherPayouts from "@/components/shared/settings/other/payouts.vue";

export default {
    name: "SettingsOther",
    components: {
        SettingsOtherSwaps,
        SettingsOtherPayouts,
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
.settings-other {
    background: $white;
    border-radius: 16px;
    padding: 24px 39px 44px 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 80px;
}

@media screen and (max-width: 1300px) {
    .settings-other {
        display: flex;
        flex-direction: column;
        grid-row-gap: 31px;
    }
}

@media screen and (max-width: 768px) {
    .settings-other {
        padding: 21px 12px 32px 12px;
    }
}
</style>
