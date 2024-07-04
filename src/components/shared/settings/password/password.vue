<template>
    <UIModal class="settings-password" @close="onClose">
        <div class="settings-password__content">
            <h2 class="settings-password__title">Change Password</h2>

            <component
                :is="getComponent"
                :form="form"
                @old="onChangeOldPassword"
                @new="onChangeNewPassword"
                @confirmation="onChangeConfirmationPassword"
                @component="onChangeComponent"
            />
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import SettingsPasswordForm from "@/components/shared/settings/password/form.vue";
import SettingsPasswordCode from "@/components/shared/settings/password/code.vue";

export const COMPONENTS = {
    form: "form",
    code: "code",
};

export default {
    name: "SettingsPassword",
    components: {
        UIModal,
        SettingsPasswordForm,
        SettingsPasswordCode,
    },
    data() {
        return {
            form: {
                oldPassword: "",
                newPassword: "",
                confirmationPassword: "",
            },
            component: COMPONENTS.form,
        };
    },
    computed: {
        getComponent() {
            switch (this.component) {
                case COMPONENTS.form:
                    return SettingsPasswordForm;
                case COMPONENTS.code:
                    return SettingsPasswordCode;
                default:
                    return SettingsPasswordCode;
            }
        },
    },
    methods: {
        onChangeComponent(component) {
            this.component = component;
        },

        onChangeOldPassword(oldPassword) {
            this.form.oldPassword = oldPassword;
        },

        onChangeNewPassword(newPassword) {
            this.form.newPassword = newPassword;
        },

        onChangeConfirmationPassword(confirmationPassword) {
            this.form.confirmationPassword = confirmationPassword;
        },

        onClose() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss">
.settings-password {
    .settings-password__content {
        width: 640px;
        padding: 48px 150px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 32px;
    }

    .settings-password__title {
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .settings-password {
        .settings-password__content {
            width: 360px;
            padding: 32px 0 24px 0;
            grid-row-gap: 24px;
            margin: 0 auto;
        }

        .settings-password__title {
            font-size: 24px;
            line-height: 29px;
        }
    }
}
</style>
