<template>
    <div class="settings-main-authentication">
        <UISvg
            class="settings-main-authentication__icon"
            icon="authentication"
        />

        <div class="settings-main-authentication__group">
            <h4 class="settings-main-authentication__name">
                Two-Factor Authentication
            </h4>

            <p class="settings-main-authentication__label">
                Used for withdrawals and security modifications
            </p>
        </div>

        <UISwitch
            class="settings-main-authentication__switch"
            :value="authentication"
            :disabled="getDisabled"
            @changed="onChangeAuthentication"
        />
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UISwitch from "@/components/ui/switch/switch.vue";

export default {
    name: "SettingsMainAuthentication",
    components: {
        UISvg,
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
            authentication: false,
        };
    },
    computed: {
        getDisabled() {
            return this.loading;
        },
    },
    methods: {
        onChangeAuthentication(authentication) {
            this.authentication = authentication;
        },
    },
};
</script>

<style lang="scss">
.settings-main-authentication {
    display: flex;
    align-items: center;

    .settings-main-authentication__icon {
        margin-right: 16px;
    }

    .settings-main-authentication__group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 4px;
    }

    .settings-main-authentication__name {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .settings-main-authentication__label {
        font-size: 10px;
        line-height: 12px;
        color: $txt-light;
    }

    .settings-main-authentication__switch {
        margin-left: auto;
    }
}
</style>
