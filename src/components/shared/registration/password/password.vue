<template>
    <div class="registration-password">
        <div class="registration-password__fields">
            <UIInputPassword
                placeholder="Password*"
                :full="true"
                :value="form.password"
                @changed="onChangePassword"
            />

            <UIInputPassword
                placeholder="Password Confirmation*"
                :full="true"
                :value="form.passwordConfirm"
                @changed="onChangePasswordConfirm"
            />
        </div>

        <UIValidation
            class="registration-password__validation"
            :validation="getValidation"
        />

        <UIButton
            label="Next"
            view="main"
            :full="true"
            :disabled="getDisabled"
            :uppercase="true"
            @clicked="onNext"
        />
    </div>
</template>

<script>
import UIInputPassword from "@/components/ui/input/password.vue";
import UIValidation from "@/components/ui/validation/validation.vue";
import UIButton from "@/components/ui/button/button.vue";

import {COMPONENTS} from "@/components/shared/registration/content/content.vue";

import {
    getPasswordValidation,
    getPasswordValidationDisabled,
} from "@/utils/functions";

export default {
    name: "RegistrationPassword",
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
            const {password, passwordConfirm} = this.form;

            return getPasswordValidation(password, passwordConfirm);
        },

        getDisabled() {
            return getPasswordValidationDisabled(this.getValidation);
        },
    },
    methods: {
        onChangePassword(password) {
            this.$emit("password", password);
        },

        onChangePasswordConfirm(passwordConfirm) {
            this.$emit("passwordConfirm", passwordConfirm);
        },

        onNext() {
            this.$emit("next", COMPONENTS.account);
        },
    },
};
</script>

<style lang="scss">
.registration-password {
    .registration-password__fields {
        display: flex;
        flex-direction: column;
        grid-row-gap: 8px;
    }

    .registration-password__validation {
        margin: 10px 0 16px 0;
    }
}
</style>
