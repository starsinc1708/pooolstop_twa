<template>
    <UICard
        :header="{
            logo: 'user',
            title: 'Register a New Account',
        }"
        :footer="{
            title: 'Already have an account?',
            label: 'Sign In',
            to: '/login',
        }"
    >
        <!-- <p>Registration is temporarily suspended</p> -->
        <component
            :is="getComponent"
            :form="form"
            @email="onChangeEmail"
            @referralId="onChangeReferralId"
            @password="onChangePassword"
            @passwordConfirm="onChangePasswordConfirm"
            @account="onChangeAccount"
            @next="onNext"
        />
    </UICard>
</template>

<script>
import UICard from "@/components/ui/card/card.vue";
import RegistrationEmail from "@/components/shared/registration/email/email.vue";
import RegistrationPassword from "@/components/shared/registration/password/password.vue";
import RegistrationAccount from "@/components/shared/registration/account/account.vue";
import RegistrationVerification from "@/components/shared/registration/verification/verification.vue";

export const COMPONENTS = {
    email: "email",
    password: "password",
    account: "account",
    verification: "verification",
    default: "",
};

export default {
    name: "RegistrationContent",
    components: {
        UICard,
        RegistrationEmail,
        RegistrationPassword,
        RegistrationAccount,
    },
    data() {
        return {
            form: {
                email: "",
                referralId: "",
                password: "",
                passwordConfirm: "",
                account: "",
                wallet: false,
            },
            component: COMPONENTS.email,
        };
    },
    computed: {
        getComponent() {
            switch (this.component) {
                case COMPONENTS.email:
                    return RegistrationEmail;
                case COMPONENTS.password:
                    return RegistrationPassword;
                case COMPONENTS.account:
                    return RegistrationAccount;
                case COMPONENTS.verification:
                    return RegistrationVerification;
                default:
                    return COMPONENTS.default;
            }
        },
    },
    methods: {
        onChangeEmail(email) {
            this.form.email = email;
        },

        onChangeReferralId(referralId) {
            this.form.referralId = referralId;
        },

        onChangePassword(password) {
            this.form.password = password;
        },

        onChangePasswordConfirm(passwordConfirm) {
            this.form.passwordConfirm = passwordConfirm;
        },

        onChangeAccount(account) {
            this.form.account = account;
        },

        onNext(component) {
            this.component = component;
        },
    },
};
</script>
