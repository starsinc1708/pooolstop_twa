<template>
    <button
        class="ui-button"
        :class="getViewClass"
        :disabled="disabled"
        @click="onClick"
    >
        <UISvg class="ui-button__icon" v-if="getIconIsShow" :icon="icon" />

        <p class="ui-button__label" v-if="getLabelIsShow">
            {{ label }}
        </p>
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const VIEWS = {
    full: "ui-button--full",
    main: "ui-button--main",
    "main-outline": "ui-button--main-outline",
    small: "ui-button--small",
    red: "ui-button--red",
    green: "ui-button--green",
    light: "ui-button--light",
    "light-small": "ui-button--light-small",
    uppercase: "ui-button--uppercase",
};

export default {
    name: "UIButton",
    components: {
        UISvg,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        view: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        size: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false,
        },
        uppercase: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getViewClass() {
            const classes = [];

            if (this.full) {
                classes.push(VIEWS.full);
            }

            if (this.view) {
                classes.push(VIEWS[this.view]);
            }

            if (this.size) {
                classes.push(VIEWS.small);
            }

            if (this.uppercase) {
                classes.push(VIEWS.uppercase);
            }

            return classes.join(" ");
        },

        getLabelIsShow() {
            return this.label;
        },

        getIconIsShow() {
            return this.icon;
        },
    },
    methods: {
        onClick() {
            this.$emit("clicked");
        },
    },
};
</script>

<style lang="scss">
.ui-button {
    @include button-reset;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-gap: 8px;

    &.ui-button--main {
        @include golos-medium;
        font-size: 14px;
        line-height: 17px;
        color: $white;
        background: $main;
        padding: 15px 20px;
        border-radius: 10px;

        &:hover {
            background: $main-hover;
        }

        &:active {
            background: $main-active;
        }

        &:disabled {
            background: $main-disabled;
            opacity: $opacity;
        }
    }

    &.ui-button--main-outline {
        @include main-outline;
    }

    &.ui-button--full {
        width: 100%;
    }

    &.ui-button--small {
        padding: 11px 17px !important;
    }

    &.ui-button--red {
        @include golos-medium;
        padding: 13px 20px;
        background: $status-red;
        border-radius: 10px;
        font-size: 14px;
        line-height: 21px;
        text-transform: uppercase;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled {
            opacity: $opacity;
        }
    }

    &.ui-button--green {
        @include golos-medium;
        font-size: 14px;
        line-height: 17px;
        color: $white;
        background: $green;
        padding: 15px 20px;
        border-radius: 10px;

        &:hover {
            background: $main-hover;
        }

        &:active {
            background: $main-active;
        }

        &:disabled {
            background: $main-disabled;
            opacity: $opacity;
        }
    }

    &.ui-button--light {
        @include golos-regular;
        font-size: 12px;
        line-height: 20px;
        color: $main;
        padding: 2px 10px;
        background: $bg-light;
        border-radius: 8px;

        &:disabled {
            opacity: $opacity;
        }
    }

    &.ui-button--light-small {
        @include golos-regular;
        padding: 5px;
        background: $bg-light;
        border-radius: 8px;
    }

    &.ui-button--uppercase {
        text-transform: uppercase;
    }
}
</style>
