<template>
    <button
        class="ui-language-toggle"
        :class="getViewClass"
        :disabled="disabled"
        @click="onToggle"
    >
        {{ language }}

        <UISvg
            class="ui-language-toggle__icon"
            :class="getIconViews"
            icon="chevronDown"
        />
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const VIEWS = {
    default: "",
    active: "ui-language-toggle--active",
};

const ICON_VIEWS = {
    default: "",
    active: "ui-language-toggle__icon--active",
};

export default {
    name: "UILanguageToggle",
    components: {
        UISvg,
    },
    props: {
        language: {
            type: String,
            default: "en",
        },
        visible: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getViewClass() {
            return this.visible ? VIEWS.active : VIEWS.default;
        },

        getIconViews() {
            return this.visible ? ICON_VIEWS.active : ICON_VIEWS.default;
        },
    },
    methods: {
        onToggle() {
            this.$emit("toggle");
        },
    },
};
</script>

<style lang="scss">
.ui-language-toggle {
    @include button-reset;
    @include golos-regular;
    width: 48px;
    height: 36px;
    border: 1px solid $gray-100;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    color: $txt-main;

    &:hover {
        background: rgba(65, 92, 107, 0.1);
        border-color: transparent;
        color: $main;
    }

    &:disabled {
        opacity: $opacity;
    }

    &.ui-language-toggle--active {
        background: rgba(65, 92, 107, 0.1);
        border-color: transparent;
        color: $main;
    }

    .ui-language-toggle__icon {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .ui-language-toggle {
        width: auto;
        height: auto;
        border: none;
        border-radius: 0;
        grid-column-gap: 12px;

        &:hover {
            background: none;
            color: $txt-main;
        }

        &.ui-language-toggle--active {
            background: none;
            color: $txt-main;
        }

        .ui-language-toggle__icon {
            display: flex;
            fill: $txt-light;
        }

        .ui-language-toggle__icon--active {
            transform: rotate(180deg);
            fill: $main;
        }
    }
}
</style>
