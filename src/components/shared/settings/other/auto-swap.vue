<template>
    <div class="settings-other-auto-swap">
        <p class="settings-other-auto-swap__label">Enable Auto Swap</p>

        <UISwitch
            :value="autoSwap"
            :disabled="getDisabled"
            @changed="onChangeAutoSwap"
        />
    </div>
</template>

<script>
import UISwitch from "@/components/ui/switch/switch.vue";

export default {
    name: "SettingsOtherAutoSwap",
    components: {
        UISwitch,
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
    computed: {
        getDisabled() {
            return this.loading;
        },
    },
    methods: {
        onChangeAutoSwap(autoSwap) {
            this.$emit("autoSwap", autoSwap);
        },
    },
};
</script>

<style lang="scss">
.settings-other-auto-swap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .settings-other-auto-swap__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
