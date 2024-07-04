<template>
    <div class="ui-menu-header">
        <button class="ui-menu-header__close" @click="onClose">
            <UISvg class="ui-menu-header__close-icon" icon="cross" />
        </button>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "UIMenuHeader",
    components: {
        UISvg,
    },
    methods: {
        onClose() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss">
.ui-menu-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .ui-menu-header__close {
        @include button-reset;
    }

    .ui-menu-header__close-icon {
        fill: $main;
    }
}
</style>
