<template>
    <div class="ui-input-default" :class="getViews">
        <p class="ui-input-default__label" v-if="getLabelIsShow">
            {{ label }}
        </p>

        <input
            ref="field"
            class="ui-input-default__field"
            :class="getFieldViewClass"
            type="number"
            :placeholder="placeholder"
            :disabled="disabled"
            v-model="currentValue"
        />
    </div>
</template>

<script>
import {getNumberOfDecimalPoints} from "@/utils/functions";

const VIEWS = {
    full: "ui-input-default--full",
    default: "",
};

const FIELD_VIEWS = {
    full: "ui-input-default__field--full",
    error: "ui-input-default__field--error",
    default: "",
};

export default {
    name: "UIInputDefault",
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
        full: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fixed: {
            type: Number,
            default: 0
        }
    },
    // watch: {
    //     currentValue (newValue) {
    //         this.$emit("changed", value);
    //     }
    // },
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

        currentValue: {
            get() {
                return this.value;
            },

            set(value) {
                console.log('to currentValue', value)
                this.$emit("changed", value, 'to');
                return
                if (this.fixed) {
                    if (getNumberOfDecimalPoints(value, this.fixed)) {
                        const fixedValue = parseFloat(value).toFixed(this.fixed);

                        this.$refs.field.value = fixedValue;

                        this.$emit("changed", fixedValue, 'to');
                    } else {
                        this.$emit("changed", value, 'to');
                    }
                } else {
                    this.$emit("changed", value, 'to');
                }
            },
        },
    },
};
</script>

<style lang="scss">
.ui-input-default {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.ui-input-default--full {
        width: 100%;
    }

    .ui-input-default__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
        margin-bottom: 4px;
    }

    .ui-input-default__field {
        @include input-reset;
        padding: 14px 16px 14px 20px;
        font-size: 14px;
        line-height: 17px;

        &:disabled {
            opacity: 1;
        }

        &.ui-input-default__field--full {
            width: 100%;
        }

        &.ui-input-default__field--error {
            border-color: $status-red;
        }
    }
}
</style>
