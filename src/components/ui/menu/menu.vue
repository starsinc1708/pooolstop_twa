<template>
    <div class="ui-menu">
        <div class="ui-menu__wrapper" v-click-outside="onClose">
            <UIMenuHeader class="ui-menu__header" @close="onClose" />

            <UIMenuProfile />

            <UIMenuExit class="ui-menu__exit" />
        </div>
    </div>
</template>

<script>
import UIMenuHeader from "@/components/ui/menu/header.vue";
import UIMenuProfile from "@/components/ui/menu/profile.vue";
import UIMenuExit from "@/components/ui/menu/exit.vue";

import {hiddenOverflowY, autoOverflowY} from "@/utils/functions.js";
import {MODALS} from "@/store/modal.js";

export default {
    name: "UIMenu",
    components: {
        UIMenuHeader,
        UIMenuProfile,
        UIMenuExit,
    },
    mounted() {
        hiddenOverflowY();
    },
    methods: {
        onClose() {
            this.$store.commit("modal/setModal", MODALS.default);

            autoOverflowY();
        },
    },
};
</script>

<style lang="scss">
.ui-menu {
    background: rgba(42, 101, 142, 0.8);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: flex-end;

    .ui-menu__wrapper {
        padding: 51px 20px 32px 40px;
        background: #ffffff;
        border-radius: 20px 0 0 20px;
        display: flex;
        flex-direction: column;
    }

    .ui-menu__header {
        margin-bottom: 94px;
    }

    .ui-menu__exit {
        margin-top: auto;
    }
}
</style>
