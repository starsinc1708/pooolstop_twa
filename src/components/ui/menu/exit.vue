<template>
    <div class="ui-menu-exit">
        <p class="ui-menu-exit__label">Log out</p>

        <button class="ui-menu-exit__logout" @click="onLogout">
            <UISvg class="ui-menu-exit__logout-icon" icon="logout" />
        </button>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import {MODALS} from "@/store/modal.js";
import {removeCookie, autoOverflowY} from "@/utils/functions.js";
import {useTelegram} from "@/utils/useTelegram";


const { user } = useTelegram();

export default {
    name: "UIMenuExit",
    components: {
        UISvg,
    },
    methods: {
        async onLogout() {
            removeCookie("accessToken");
            removeCookie("refreshToken");

            this.$store.commit("modal/setModal", MODALS.default);

            if (user) {
              try {
                const Api = (await import("@/api/api")).default;
                const api = new Api();
                await api.deleteUserSync(user)
              } catch (e) {
                console.error(e);
              }
            }

            autoOverflowY();

            this.$router.push("/login");
        },
    },
};
</script>

<style lang="scss">
.ui-menu-exit {
    padding-top: 32px;
    border-top: 1px solid $gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 157px;

    .ui-menu-exit__label {
        font-size: 16px;
        line-height: 19px;
        color: $txt-main;
    }

    .ui-menu-exit__logout {
        @include button-reset;
    }

    .ui-menu-exit__logout-icon {
        fill: $txt-light;
    }
}
</style>
