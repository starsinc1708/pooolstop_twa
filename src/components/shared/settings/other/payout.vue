<template>
    <div class="settings-other-payout">
        <p class="settings-other-payout__label">Enable Auto Payout</p>

        <UISwitch
            :value="autoPayout"
            :disabled="getDisabled"
            @changed="onChangeAutoPayout"
        />
    </div>
</template>

<script>
import UISwitch from "@/components/ui/switch/switch.vue";

export default {
    name: "SettingsOtherPayout",
    components: {
        UISwitch,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            autoPayout: false,
        };
    },
    computed: {
        getDisabled() {
            return this.loading;
        },
    },
    methods: {
        onChangeAutoPayout(autoPayout) {
            this.autoPayout = autoPayout;
        },
    },
};
</script>

<style lang="scss">
.settings-other-payout {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .settings-other-payout__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
