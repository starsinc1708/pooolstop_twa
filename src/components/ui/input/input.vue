<template>
    <div class="ui-input" :class="getViews">
        <p class="ui-input__label" v-if="getLabelIsShow">
            {{ label }}
        </p>

        <input
            class="ui-input__field"
            :class="getFieldViewClass"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            v-model="currentValue"
        />

        <p class="ui-input__message" v-if="getMessageIsShow">
            {{ message }}
        </p>
    </div>
</template>

<script>
const VIEWS = {
    full: "ui-input--full",
    default: "",
};

const FIELD_VIEWS = {
    full: "ui-input__field--full",
    error: "ui-input__field--error",
    default: "",
};

export default {
    name: "UIInput",
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
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
    computed: {
        getViews() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getLabelIsShow() {
            return this.label;
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

        getMessageIsShow() {
            return this.error && this.message;
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
.ui-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.ui-input--full {
        width: 100%;
    }

    .ui-input__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
        margin-bottom: 4px;
    }

    .ui-input__field {
        @include input-reset;
        padding: 14px 16px 14px 20px;
        font-size: 14px;
        line-height: 17px;

        &.ui-input__field--full {
            width: 100%;
        }

        &.ui-input__field--error {
            border-color: $status-red;
        }
    }

    .ui-input__message {
        @include golos-regular;
        font-size: 12px;
        line-height: 14px;
        color: $status-red;
        margin-top: 4px;
    }
}
</style>
