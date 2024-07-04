<template>
    <button
        class="ui-select-toggle"
        :class="getViewClass"
        :disabled="disabled"
        @click="onToggle"
    >
        <div class="ui-select-toggle__group">
            <UISvg v-if="getIconIsShow" :icon="getIcon" />

            <p class="ui-select-toggle__label">
                {{ getValue }}
            </p>
        </div>

        <UISvg
            class="ui-select-toggle__chevron"
            :class="getChevronViewClass"
            icon="chevronDown"
        />
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const VIEWS = {
    full: "ui-select-toggle--full",
    active: "ui-select-toggle--active",
};

const CHEVRON_VIEWS = {
    default: "",
    active: "ui-select-toggle__chevron--active",
};

export default {
    name: "UISelectToggle",
    components: {
        UISvg,
    },
    props: {
        toggle: {
            type: Boolean,
            required: true,
        },
        full: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
        view: {
            type: String,
            default: "",
        },
    },
    computed: {
        getViewClass() {
            const classes = [];

            if (this.full) {
                classes.push(VIEWS.full);
            }

            if (this.toggle) {
                classes.push(VIEWS.active);
            }

            if (this.view) {
                classes.push(`ui-select-toggle--${this.view}`);
            }

            return classes.join(" ");
        },

        getChevronViewClass() {
            return this.toggle ? CHEVRON_VIEWS.active : CHEVRON_VIEWS.default;
        },

        getOption() {
            return this.options.find((option) => option.value === this.value);
        },

        getIconIsShow() {
            return this.getOption && this.getOption.icon;
        },

        getIcon() {
            return this.getOption.icon;
        },

        getValue() {
            return this.getOption ? this.getOption.label : "";
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
.ui-select-toggle {
    @include button-reset;
    background: $gray-100;
    border-radius: 10px;
    padding: 10px 16px 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 27px;
    border: 1px solid transparent;
    height: 47px;

    &:hover {
        border-color: $main;
    }

    &:disabled {
        opacity: $opacity;

        &:hover {
            border-color: transparent;
        }
    }

    &.ui-select-toggle--gray {
        &:hover {
            border-color: transparent;
        }

        &.ui-select-toggle--active {
            border-color: transparent;
        }
    }

    &.ui-select-toggle--full {
        width: 100%;
    }

    &.ui-select-toggle--active {
        border-color: $main;
    }

    .ui-select-toggle__group {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        grid-column-gap: 8px;
        max-width: calc(100% - 40px);
    }

    .ui-select-toggle__label {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .ui-select-toggle__chevron {
        fill: $txt-light;
    }

    .ui-select-toggle__chevron--active {
        fill: $main;
        transform: rotate(180deg);
    }
}
</style>
