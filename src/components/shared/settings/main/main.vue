<template>
    <div class="settings-main">
        <SettingsMainSecurity
            :loading="loading"
            @password="onChangePassword"
            @email="onChangeEmail"
            @loading="onChangeLoading"
        />

        <SettingsMainNotifications
            :loading="loading"
            @loading="onChangeLoading"
        />
    </div>
</template>

<script>
import SettingsMainSecurity from "@/components/shared/settings/main/security.vue";
import SettingsMainNotifications from "@/components/shared/settings/main/notifications.vue";

export default {
    name: "SettingsMain",
    components: {
        SettingsMainSecurity,
        SettingsMainNotifications,
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
.settings-main {
    background: $white;
    border-radius: 16px;
    padding: 24px 40px 48px 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 80px;
}

@media screen and (max-width: 1300px) {
    .settings-main {
        display: flex;
        flex-direction: column;
        grid-row-gap: 29px;
    }
}

@media screen and (max-width: 768px) {
    .settings-main {
        padding: 21px 12px 32px 12px;
    }
}
</style>
