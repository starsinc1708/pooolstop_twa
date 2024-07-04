<template>
    <router-link class="ui-page-header-swap ui-page-header-swap--disabled" to="/settings?swap=true">
        <UISvg class="ui-page-header-swap__icon" icon="auto-swap" />

        <p class="ui-page-header-swap__label">Auto Swap</p>
    </router-link>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "UIPageHeaderSwap",
    components: {
        UISvg,
    },
};
</script>

<style lang="scss">
.ui-page-header-swap {
    border: 1px solid rgba(158, 159, 168, 0.2);
    border-radius: 10px;
    padding: 9px 16px 9px 14px;
    fill: $txt-light;
    transition: $transition;
    display: flex;
    align-items: center;
    grid-column-gap: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(65, 92, 107, 0.1);
        border-color: transparent;
        fill: $main-hover;

        .ui-page-header-swap__label {
            color: $main-hover;
        }
    }

    &.ui-page-header-swap--disabled {
        cursor: default;
        pointer-events: none;
        opacity: $opacity;
    }

    .ui-page-header-swap__icon {
        width: 18px;
        height: 18px;
    }

    .ui-page-header-swap__label {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
        transition: $transition;
    }
}

@media screen and (max-width: 1024px) {
    .ui-page-header-swap {
        background: #dfeef6;
        border: none;
        padding: 6px;
        fill: $main;

        .ui-page-header-swap__icon {
            width: 24px;
            height: 24px;
        }

        .ui-page-header-swap__label {
            display: none;
        }
    }
}
</style>
