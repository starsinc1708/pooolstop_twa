<template>
    <div class="settings-main-email">
        <UISvg class="settings-main-email__icon" icon="email" />

        <div class="settings-main-email__block">
            <div class="settings-main-email__group">
                <h4 class="settings-main-email__name">{{ getEmail }}</h4>

                <p class="settings-main-email__label">
                    Used for withdrawals and security modifications
                </p>
            </div>

            <div class="settings-main-email__check">
                <UISvg class="settings-security__check-icon" icon="check" />

                <p class="settings-main-email__check-label">Verified</p>
            </div>
        </div>

        <UIButton
            class="settings-main-email__change"
            label="Change"
            view="main-outline"
            size="small"
            :disabled="getDisabled"
            @clicked="onChangeEmail"
        />
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "SettingsMainEmail",
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

        getEmail() {
            return this.$store.state.user.email;
        },
    },
    methods: {
        onChangeEmail() {
            this.$emit("email");
        },
    },
};
</script>

<style lang="scss">
.settings-main-email {
    display: flex;
    align-items: center;

    .settings-main-email__icon {
        margin-right: 16px;
    }

    .settings-main-email__block {
        display: flex;
        align-items: center;
        grid-column-gap: 16px;
    }

    .settings-main-email__group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 4px;
        margin-right: 16px;
    }

    .settings-main-email__name {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .settings-main-email__label {
        font-size: 10px;
        line-height: 12px;
        color: $txt-light;
    }

    .settings-main-email__change {
        margin-left: auto;
    }

    .settings-main-email__check {
        display: flex;
        align-items: center;
        grid-column-gap: 4px;
        padding: 2px 8px;
        background: $green;
        border-radius: 13px;
    }

    .settings-main-email__check-label {
        @include golos-medium;
        font-size: 10px;
        line-height: 17px;
        text-transform: uppercase;
        color: $white;
    }
}

@media screen and (max-width: 768px) {
    .settings-main-email {
        .settings-main-email__block {
            flex-direction: column;
            align-items: flex-start;
            grid-row-gap: 6px;
        }

        .settings-main-email__label {
            display: none;
        }

        .settings-main-email__check {
            padding: 1px 7px 1px 4px;
        }
    }
}
</style>
