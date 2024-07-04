<template>
    <div class="settings-main-password">
        <UISvg class="settings-main-password__icon" icon="password" />

        <p class="settings-main-password__name">Password</p>

        <UIButton
            class="settings-main-password__change"
            label="Change"
            view="main-outline"
            size="small"
            :disabled="getDisabled"
            @clicked="onChangePassword"
        />
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "SettingsMainPassword",
    components: {
        UISvg,
        UIButton,
    },
    props: {
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
        onChangePassword() {
            this.$emit("password");
        },
    },
};
</script>

<style lang="scss">
.settings-main-password {
    display: flex;
    align-items: center;

    .settings-main-password__icon {
        margin-right: 16px;
    }

    .settings-main-password__name {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .settings-main-password__change {
        margin-left: auto;
    }
}
</style>
