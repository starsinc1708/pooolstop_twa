<template>
    <UICard
        class="login-content"
        :header="{
            logo: 'fingerprint',
            title: 'Sign In',
        }"
        :footer="{
            title: `Don't have an account yet?`,
            label: 'Create Account',
            to: '/registration',
        }"
    >
        <LoginForm />
    </UICard>
</template>

<script>
import UICard from "@/components/ui/card/card.vue";
import LoginForm from "@/components/shared/login/form/form.vue";

export default {
    name: "LoginContent",
    components: {
        UICard,
        LoginForm,
    },
};
</script>
