<template>
    <div class="restore-password-password">
        <div class="restore-password-password__fields">
            <UIInputPassword
                placeholder="New Password*"
                :full="true"
                :value="form.password"
                :error="error"
                @changed="onChangePassword"
            />

            <UIInputPassword
                placeholder="Confirm Password*"
                :full="true"
                :value="form.passwordConfirm"
                :error="error"
                @changed="onChangePasswordConfirm"
            />
        </div>

        <UIButton
            label="Change Password"
            view="main"
            :full="true"
            :disabled="getDisabled"
            :uppercase="true"
            @clicked="onChange"
        />
    </div>
</template>

<script>
import UIInputPassword from "@/components/ui/input/password.vue";
import UIButton from "@/components/ui/button/button.vue";

import {
    getPasswordValidation,
    getPasswordValidationDisabled,
} from "@/utils/functions";

import Api from "@/api/api";
import {RESPONSE_STATUSES} from "@/utils/constants";

const api = new Api();

export default {
    name: "RestorePasswordPassword",
    components: {
        UIInputPassword,
        UIButton,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            error: false,
        };
    },
    computed: {
        getValidation() {
            const {password, passwordConfirm} = this.form;

            return getPasswordValidation(password, passwordConfirm);
        },

        getDisabled() {
            return (
                getPasswordValidationDisabled(this.getValidation) ||
                this.loading
            );
        },

        getCode() {
            const {
                fieldOne,
                fieldTwo,
                fieldThree,
                fieldFour,
                fieldFive,
                fieldSix,
            } = this.form;

            return `${fieldOne}${fieldTwo}${fieldThree}${fieldFour}${fieldFive}${fieldSix}`;
        },
    },
    methods: {
        onChangePassword(password) {
            this.$emit("password", password);
        },

        onChangePasswordConfirm(passwordConfirm) {
            this.$emit("passwordConfirm", passwordConfirm);
        },

        async onChange() {
            try {
                this.loading = true;
                this.error = false;

                const {email, password} = this.form;

                await api
                    .changePassword({
                        email,
                        token: this.getCode,
                        password,
                    })
                    .then(({status}) => {
                        if (status === RESPONSE_STATUSES.error) {
                            this.error = true;
                        } else {
                            this.$router.push("/login");
                        }

                        this.loading = false;
                    });
            } catch (e) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss">
.restore-password-password {
    display: flex;
    flex-direction: column;
    grid-row-gap: 16px;

    .restore-password-password__fields {
        display: flex;
        flex-direction: column;
        grid-row-gap: 8px;
    }
}
</style>
