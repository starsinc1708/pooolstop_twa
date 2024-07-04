<template>
    <div class="ui-toolbar-header">
        <router-link class="ui-toolbar-header__link" to="/">
            <img
                class="ui-toolbar-header__logo"
                src="@/assets/images/ui/toolbar/logo.svg"
                alt="logo"
            />
        </router-link>

        <button class="ui-toolbar-header__burger" @click="onMenu">
            <img
                class="ui-toolbar-header__burger-icon"
                src="@/assets/images/ui/toolbar/burger.svg"
                alt="burger"
            />
        </button>
    </div>
</template>

<script>
import {MODALS} from "@/store/modal.js";

export default {
    name: "UIToolbarHeader",
    methods: {
        onMenu() {
            this.$store.commit("modal/setModal", MODALS.menu);
        },
    },
};
</script>

<style lang="scss">
.ui-toolbar-header {
    .ui-toolbar-header__link {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ui-toolbar-header__burger {
        @include button-reset;
        display: none;
    }

    .ui-toolbar-header__burger-icon {
        display: block;
    }
}

@media screen and (max-width: 768px) {
    .ui-toolbar-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 11px;
        margin-bottom: 24px;
        .ui-toolbar-header__logo {
            width: 24px;
        }

        .ui-toolbar-header__burger {
            display: block;
        }
    }
}
</style>
