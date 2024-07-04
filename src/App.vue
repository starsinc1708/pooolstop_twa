<template>
    <div class="app">
        <component :is="getLayout" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import {useTelegram} from "@/utils/useTelegram";

const {tg} = useTelegram()

onMounted(() => {
  tg.ready();
  tg.expand();
})
</script>

<script>
import DefaultLayout from "@/layouts/default.vue";
import AuthorizationLayout from "@/layouts/authorization.vue";

const LAYOUTS = {
    default: DefaultLayout,
    authorization: AuthorizationLayout,
};

export default {
    name: "App",
    components: {
        DefaultLayout,
        AuthorizationLayout,
    },
    watch: {
        "$route.meta.background"(background) {
            document.body.style.background = background;
        },
    },
    computed: {
        getLayout() {
            const {layout} = this.$route.meta;
            return LAYOUTS[layout];
        },
    },
};
</script>

<style lang="scss">
.app {
    height: 100%;
}
</style>
