<template>
    <div class="settings-password-form">
        <div class="settings-password-form__fields">
            <UIInputPassword
                placeholder="Enter your old password*"
                :full="true"
                :value="form.oldPassword"
                @changed="onChangeOldPassword"
            />

            <UIInputPassword
                placeholder="Enter your new password*"
                :full="true"
                :value="form.newPassword"
                @changed="onChangeNewPassword"
            />

            <UIInputPassword
                placeholder="Password confirmation*"
                :full="true"
                :value="form.confirmationPassword"
                @changed="onChangeConfirmationPassword"
            />
        </div>

        <UIValidation
            class="settings-password-form__validation"
            :validation="getValidation"
        />

        <UIButton
            label="Next"
            view="main"
            :full="true"
            :disabled="getDisabled"
            @clicked="onNext"
        />
    </div>
</template>

<script>
import UIInputPassword from "@/components/ui/input/password.vue";
import UIButton from "@/components/ui/button/button.vue";
import UIValidation from "@/components/ui/validation/validation.vue";

import {COMPONENTS} from "@/components/shared/settings/password/password.vue";

import {
    getPasswordValidation,
    getPasswordValidationDisabled,
} from "@/utils/functions.js";

const PASSWORD_MIN_LENGTH = 8;

export default {
    name: "SettingsPasswordForm",
    components: {
        UIInputPassword,
        UIValidation,
        UIButton,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getValidation() {
            const {newPassword, confirmationPassword} = this.form;

            return getPasswordValidation(newPassword, confirmationPassword);
        },

        getOldPasswordValidation() {
            const {oldPassword} = this.form;

            return oldPassword.length >= PASSWORD_MIN_LENGTH;
        },

        getDisabled() {
            return (
                getPasswordValidationDisabled(this.getValidation) ||
                !this.getOldPasswordValidation
            );
        },
    },
    methods: {
        onChangeOldPassword(oldPassword) {
            this.$emit("old", oldPassword);
        },

        onChangeNewPassword(newPassword) {
            this.$emit("new", newPassword);
        },

        onChangeConfirmationPassword(confirmationPassword) {
            this.$emit("confirmation", confirmationPassword);
        },

        onNext() {
            this.$emit("component", COMPONENTS.code);
        },
    },
};
</script>

<style lang="scss">
.settings-password-form {
    .settings-password-form__fields {
        display: flex;
        flex-direction: column;
        grid-row-gap: 8px;
        margin-bottom: 10px;
    }

    .settings-password-form__validation {
        margin-bottom: 24px;
    }
}
</style>
