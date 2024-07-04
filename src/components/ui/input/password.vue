<template>
    <div class="ui-input-password" :class="getViews">
        <input
            class="ui-input-password__field"
            :class="getFieldViewClass"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            v-model="currentValue"
        />

        <button class="ui-input-password__switch" @click="onSwitch">
            <img
                class="ui-input-password__switch-icon"
                :src="getSwitchIcon"
                alt="icon"
            />
        </button>
    </div>
</template>

<script>
const VIEWS = {
    full: "ui-input-password--full",
    default: "",
};

const FIELD_VIEWS = {
    full: "ui-input-password__field--full",
    error: "ui-input-password__field--error",
    default: "",
};

const TYPES = {
    text: "text",
    password: "password",
};

const SWITCH_ICONS = {
    show: require("@/assets/images/ui/input/show.svg"),
    hide: require("@/assets/images/ui/input/hide.svg"),
};

export default {
    name: "UIInputPassword",
    props: {
        value: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        validate: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            type: TYPES.password,
        };
    },
    computed: {
        getViews() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getFieldViewClass() {
            const classes = [];

            if (this.full) {
                classes.push(FIELD_VIEWS.full);
            }

            if (this.error) {
                classes.push(FIELD_VIEWS.error);
            }

            return classes.join(" ");
        },

        getSwitchIcon() {
            switch (this.type) {
                case TYPES.text:
                    return SWITCH_ICONS.hide;
                case TYPES.password:
                    return SWITCH_ICONS.show;
                default:
                    return SWITCH_ICONS.hide;
            }
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
    methods: {
        onSwitch() {
            switch (this.type) {
                case TYPES.password:
                    this.type = TYPES.text;
                    break;
                case TYPES.text:
                    this.type = TYPES.password;
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style lang="scss">
.ui-input-password {
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-row-gap: 4px;
    position: relative;

    &.ui-input-password--full {
        width: 100%;
    }

    .ui-input-password__field {
        @include golos-regular;
        padding: 14px 50px 14px 20px;
        background: $gray-100;
        border-radius: 10px;
        border: none;
        outline: none;
        transition: $transition;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        border: 1px solid transparent;

        &::placeholder {
            opacity: 1;
        }

        &:hover,
        &:focus {
            border-color: $main;
        }

        &:disabled {
            opacity: $opacity;

            &:hover {
                border-color: transparent;
            }
        }

        &.ui-input-password__field--full {
            width: 100%;
        }

        &.ui-input-password__field--error {
            border-color: $status-red;
        }
    }

    .ui-input-password__switch {
        @include button-reset;
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
    }
}
</style>
