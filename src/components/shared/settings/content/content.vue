<template>
    <div class="settings-content">
        <UIPageHeader class="settings-content__header" title="Settings" />

        <SettingsMain
            class="settings-content__main"
            :loading="loading"
            @password="onChangePassword"
            @email="onChangeEmail"
            @loading="onChangeLoading"
        />

        <SettingsOther
            id="other"
            :loading="loading"
            @loading="onChangeLoading"
        />

        <transition name="modal">
            <SettingsPassword
                class="settings-content__password"
                v-if="getPasswordIsShow"
                @close="onClosePassword"
            />
        </transition>
    </div>
</template>

<script>
import UIPageHeader from "@/components/ui/page-header/page-header.vue";
import SettingsMain from "@/components/shared/settings/main/main.vue";
import SettingsOther from "@/components/shared/settings/other/other.vue";
import SettingsPassword from "@/components/shared/settings/password/password.vue";

export default {
    name: "SettingsContent",
    components: {
        UIPageHeader,
        SettingsMain,
        SettingsOther,
        SettingsPassword,
    },
    data() {
        return {
            loading: false,
            password: false,
            email: false,
        };
    },
    mounted() {
        this.onScroll();
    },
    computed: {
        getPasswordIsShow() {
            return this.password;
        },
    },
    methods: {
        onScroll() {
            const {swap} = this.$route.query;

            if (swap) {
                const targetElement = document.getElementById("other");

                targetElement.scrollIntoView({behavior: "smooth"});
            }
        },

        onChangeLoading(loading) {
            this.loading = loading;
        },

        onChangePassword() {
            this.password = true;
        },

        onClosePassword() {
            this.password = false;
        },

        onChangeEmail() {
            this.email = true;
        },
    },
};
</script>

<style lang="scss">
.settings-content {
    .settings-content__header {
        margin-bottom: 22px;
    }

    .settings-content__main {
        margin-bottom: 16px;
    }

    .settings-content__password {
        @include modal;
    }
}
</style>
