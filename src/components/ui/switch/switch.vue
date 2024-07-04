<template>
    <div class="ui-switch">
        <p class="ui-switch__label" v-if="label">
            {{ label }}
        </p>

        <label class="ui-switch__toggle">
            <input
                class="ui-switch__input"
                type="checkbox"
                :disabled="disabled"
                v-model="currentValue"
            />

            <span class="ui-switch__slider" :class="getSliderViewClass"></span>
        </label>
    </div>
</template>

<script>
const SLIDER_VIEWS = {
    disabled: "ui-switch__slider--disabled",
    default: "",
};

export default {
    name: "UISwitch",
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getSliderViewClass() {
            return this.disabled ? SLIDER_VIEWS.disabled : SLIDER_VIEWS.default;
        },

        currentValue: {
            get() {
                return this.value;
            },

            set(value) {
                this.$emit("changed", value);
            },
        },
    },
};
</script>

<style lang="scss">
.ui-switch {
    display: flex;
    align-items: center;
    grid-column-gap: 12px;

    .ui-switch__toggle {
        width: 50px;
        height: 28px;
        position: relative;
        display: inline-block;
    }

    .ui-switch__input {
        opacity: 0;
        width: 0;
        height: 0;
        outline: none;

        &:checked + .ui-switch__slider {
            background: $main;
        }

        &:checked + .ui-switch__slider:before {
            transform: translateX(20px);
        }
    }

    .ui-switch__slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 40px;
        background: $gray-100;
        transition: $transition;

        &::before {
            position: absolute;
            content: "";
            width: 22px;
            height: 22px;
            left: 4px;
            bottom: 3px;
            border-radius: 50%;
            background: $white;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
            transition: $transition;
        }
    }

    .ui-switch__slider--disabled {
        opacity: $opacity;
        cursor: default;
    }

    .ui-switch__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
        white-space: nowrap;
    }
}

@media screen and (max-width: 1024px) {
    .ui-switch {
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 8px;
    }
}
</style>
