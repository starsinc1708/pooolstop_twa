<template>
    <button
        class="ui-checkbox"
        :class="getViewClass"
        :disabled="disabled"
        @click="onChecked"
    >
        <img
            class="ui-checkbox__icon"
            :class="getIconViewClass"
            v-if="getCheckIsShow"
            src="@/assets/images/ui/checkbox/check.svg"
            alt="check"
        />
    </button>
</template>

<script>
const VIEWS = {
    active: "ui-checkbox--active",
    small: "ui-checkbox--small",
};

const ICON_VIEWS = {
    small: "ui-checkbox__icon--small",
    default: "",
};

export default {
    name: "UICheckbox",
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        small: {
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
            const classes = [];

            if (this.value) {
                classes.push(VIEWS.active);
            }

            if (this.small) {
                classes.push(VIEWS.small);
            }

            return classes.join(" ");
        },

        getIconViewClass() {
            return this.small ? ICON_VIEWS.small : ICON_VIEWS.default;
        },

        getCheckIsShow() {
            return this.value;
        },
    },
    methods: {
        onChecked() {
            this.$emit("changed", !this.value);
        },
    },
};
</script>

<style lang="scss">
.ui-checkbox {
    @include button-reset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    min-width: 28px;
    background: $gray-100;
    border: 1px solid transparent;
    border-radius: 8px;

    &:hover {
        border-color: $main;
    }

    &:disabled {
        opacity: $opacity;
    }

    &.ui-checkbox--active {
        background: $main;
    }
}

@media screen and (max-width: 768px) {
    .ui-checkbox {
        &.ui-checkbox--small {
            width: 22px;
            height: 22px;
            min-width: 22px;
        }

        .ui-checkbox__icon--small {
            width: 12px;
            height: 12px;
        }
    }
}
</style>
