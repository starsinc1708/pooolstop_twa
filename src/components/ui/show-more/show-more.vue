<template>
    <button class="ui-show-more" :disabled="disabled" @click="onShowMore">
        <UISvg icon="reload" />

        Show more
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "UIShowMore",
    components: {
        UISvg,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onShowMore() {
            this.$emit("more");
        },
    },
};
</script>

<style lang="scss">
.ui-show-more {
    @include button-reset;
    @include golos-regular;
    display: flex;
    align-items: center;
    grid-column-gap: 10px;
    padding: 10px 22px;
    border: 1px solid $gray-100;
    border-radius: 10px;
    font-size: 14px;
    line-height: 16px;
    color: $txt-main;

    &:disabled {
        opacity: $opacity;
    }
}
</style>
