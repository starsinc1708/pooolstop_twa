<template>
    <div class="ui-amount" :class="getViewClass">
        <div class="ui-amount__header" v-if="getHeaderIsSHow">
            <p class="ui-amount__label">{{ label }}</p>

            <div class="ui-amount__header-group">
                <UIButton
                    v-if="min"
                    label="MIN"
                    view="light"
                    :disabled="disabled"
                    @clicked="onMin"
                />

                <UIButton
                    v-if="max"
                    label="MAX"
                    view="light"
                    :disabled="disabled"
                    @clicked="onMax"
                />
            </div>
        </div>

        <div class="ui-amount__block" :class="getBlockViewClass">
            <input
                class="ui-amount__field"
                ref="field"
                :class="getFieldViewClass"
                :placeholder="placeholder"
                type="number"
                :disabled="disabled"
                v-model="currentValue"
            />

            <p class="ui-amount__currency" v-if="currency">
                {{ currency }}
            </p>
        </div>
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";
import {getNumberOfDecimalPoints} from "@/utils/functions";

const VIEWS = {
    default: "",
    full: "ui-amount--full",
};

const BLOCK_VIEWS = {
    default: "",
    full: "ui-amount__block--full",
};

const FIELD_VIEWS = {
    full: "ui-amount__field--full",
    currency: "ui-amount__field--currency",
};

export default {
    name: "UIAmount",
    components: {
        UIButton,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        currency: {
            type: String,
            default: "",
        },
        full: {
            type: Boolean,
            default: false,
        },
        max: {
            type: Boolean,
            default: false,
        },
        min: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Number, String],
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        length: {
            type: Number,
            default: false,
        },
    },
    computed: {
        getViewClass() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getHeaderIsSHow() {
            return this.label || this.max;
        },

        getBlockViewClass() {
            return this.full ? BLOCK_VIEWS.full : BLOCK_VIEWS.default;
        },

        getFieldViewClass() {
            const classes = [];

            if (this.full) {
                classes.push(FIELD_VIEWS.full);
            }

            if (this.currency) {
                classes.push(FIELD_VIEWS.currency);
            }

            return classes.join(" ");
        },

        currentValue: {
            get() {
                return this.value;
            },

            set(value) {
                if (this.fixed) {
                    if (getNumberOfDecimalPoints(value, this.length)) {
                        const fixedValue = parseFloat(value).toFixed(
                            this.length
                        );

                        this.$refs.field.value = fixedValue;

                        this.$emit("changed", fixedValue);
                    } else {
                        this.$emit("changed", value);
                    }
                } else {
                    this.$emit("changed", value);
                }
            },
        },
    },
    methods: {
        onMin() {
            this.$emit("min");
        },

        onMax() {
            this.$emit("max");
        },
    },
};
</script>

<style lang="scss">
.ui-amount {
    display: flex;
    flex-direction: column;
    grid-row-gap: 4px;

    &.ui-amount--full {
        width: 100%;
    }

    .ui-amount__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ui-amount__header-group {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .ui-amount__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }

    .ui-amount__block {
        position: relative;
    }

    .ui-amount__block--full {
        width: 100%;
    }

    .ui-amount__field {
        @include input-reset;
        padding: 14px 16px 14px 20px;
        font-size: 14px;
        line-height: 17px;
        appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    .ui-amount__field--full {
        width: 100%;
    }

    .ui-amount__field--currency {
        padding-right: 60px;
    }

    .ui-amount__currency {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        font-size: 14px;
        line-height: 21px;
        color: $txt-light;
    }
}
</style>
