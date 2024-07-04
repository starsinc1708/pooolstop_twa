<template>
    <div class="ui-introduction">
        <transition name="modal">
            <UIIntroductionWelcome
                v-if="welcome"
                :class="getWelcomeViewClass"
                @welcome="onWelcome"
            />
        </transition>

        <transition name="modal">
            <UIIntroductionBoard
                v-if="board"
                :class="getBoardViewClass"
                @board="onBoard"
            />
        </transition>
    </div>
</template>

<script>
import UIIntroductionWelcome from "@/components/ui/introduction/welcome.vue";
import UIIntroductionBoard from "@/components/ui/introduction/board.vue";

import {
    autoOverflowY,
    hiddenOverflowY,
    removeCookie,
} from "@/utils/functions.js";

import {MODALS} from "@/store/modal.js";

export default {
    name: "UIIntroduciton",
    components: {
        UIIntroductionWelcome,
        UIIntroductionBoard,
    },
    data() {
        return {
            welcome: true,
            board: false,
        };
    },
    mounted() {
        hiddenOverflowY();
    },
    methods: {
        onWelcome() {
            this.welcome = false;

            this.board = true;
        },

        onBoard() {
            this.board = false;

            removeCookie("introduction");
            autoOverflowY();

            this.$store.commit("modal/setModal", MODALS.default);
        },
    },
};
</script>

<style lang="scss">
.ui-introduction {
    background: rgba(34, 35, 39, 0.3);
}
</style>
