<template>
    <UICard
        class="restore-password-content"
        :header="{
            logo: 'restore',
            title: 'Restore Password',
        }"
        :footer="{
            title: `Don't have an account yet?`,
            label: 'Create Account',
            to: '/registration',
        }"
    >
        <component
            :is="getComponent"
            :form="form"
            @email="onChangeEmail"
            @code="onChangeCode"
            @password="onChangePassword"
            @passwordConfirm="onChangePasswordConfirm"
            @next="onChangeComponent"
        />
    </UICard>
</template>

<script>
import UICard from "@/components/ui/card/card.vue";
import RestorePasswordEmail from "@/components/shared/restore-pasword/email/email.vue";
import RestorePasswrodCode from "@/components/shared/restore-pasword/code/code.vue";
import RestorePasswordPassword from "@/components/shared/restore-pasword/password/password.vue";

export const COMPONENTS = {
    email: "email",
    code: "code",
    password: "password",
};

export default {
    name: "RestorePasswordContent",
    components: {
        UICard,
        RestorePasswordEmail,
        RestorePasswrodCode,
        RestorePasswordPassword,
    },
    data() {
        return {
            component: COMPONENTS.email,
            form: {
                email: "",
                fieldOne: "",
                fieldTwo: "",
                fieldThree: "",
                fieldFour: "",
                fieldFive: "",
                fieldSix: "",
                password: "",
                passwordConfirm: "",
            },
        };
    },
    computed: {
        getComponent() {
            switch (this.component) {
                case COMPONENTS.email:
                    return RestorePasswordEmail;
                case COMPONENTS.code:
                    return RestorePasswrodCode;
                case COMPONENTS.password:
                    return RestorePasswordPassword;
                default:
                    return RestorePasswordEmail;
            }
        },
    },
    methods: {
        onChangeEmail(email) {
            this.form.email = email;
        },

        onChangeCode({key, value}) {
            this.form[key] = value;
        },

        onChangePassword(password) {
            this.form.password = password;
        },

        onChangePasswordConfirm(passwordConfirm) {
            this.form.passwordConfirm = passwordConfirm;
        },

        onChangeComponent(component) {
            this.component = component;
        },
    },
};
</script>
