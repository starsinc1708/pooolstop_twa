<template>
    <div class="settings-main-security">
        <h2 class="settings-main-security__title">Security</h2>

        <div class="settings-main-security__group">
            <SettingsMainAuthentication
                :loading="loading"
                @loading="onChangeLoading"
            />

            <SettingsMainPassword
                :loading="loading"
                @loading="onChangeLoading"
                @password="onChangePassword"
            />
        </div>

        <SettingsMainEmail
            :loading="loading"
            @loading="onChangeLoading"
            @email="onChangeEmail"
        />
    </div>
</template>

<script>
import SettingsMainAuthentication from "@/components/shared/settings/main/authentication.vue";
import SettingsMainPassword from "@/components/shared/settings/main/password.vue";
import SettingsMainEmail from "@/components/shared/settings/main/email.vue";

export default {
    name: "SettingsMainSecurity",
    components: {
        SettingsMainAuthentication,
        SettingsMainPassword,
        SettingsMainEmail,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onChangeLoading(loading) {
            this.$emit("loading", loading);
        },

        onChangePassword() {
            this.$emit("password");
        },

        onChangeEmail() {
            this.$emit("email");
        },
    },
};
</script>

<style lang="scss">
.settings-main-security {
    .settings-main-security__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
        margin-bottom: 35px;
    }

    .settings-main-security__group {
        display: flex;
        flex-direction: column;
        grid-row-gap: 16px;
        padding-bottom: 24px;
        border-bottom: 1px solid $gray;
        margin-bottom: 24px;
    }
}

@media screen and (max-width: 1300px) {
    .settings-main-security {
        padding-bottom: 24px;
        border-bottom: 1px solid $gray;
    }
}

@media screen and (max-width: 768px) {
    .settings-main-security {
        .settings-main-security__title {
            font-size: 24px;
            line-height: 29px;
            margin: 0 0 24px 4px;
        }
    }
}
</style>
