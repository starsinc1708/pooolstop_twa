<template>
    <div class="ui-range" :class="getViewClass">
        <p class="ui-range__label" v-if="label">{{ label }}</p>

        <input
            class="ui-range__field"
            :key="fieldKey"
            :class="getFieldViewClass"
            type="range"
            :min="min"
            :max="max"
            v-model="currentValue"
        />
    </div>
</template>

<script>
import {v4} from "uuid";

const VIEWS = {
    default: "",
    full: "ui-range--full",
};

const FIELD_VIEWS = {
    default: "",
    full: "ui-range__field--full",
};

const DEFAULT_VALUE = 0;

export default {
    name: "UIRange",
    props: {
        label: {
            type: String,
            default: "",
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
        value: {
            type: [String, Number],
            default: 0,
        },
        full: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            fieldKey: "",
        };
    },
    watch: {
        value(to, from) {
            if (from === DEFAULT_VALUE) {
                this.fieldKey = v4();
            }

            if (to === DEFAULT_VALUE) {
                this.fieldKey = v4();
            }
        },
    },
    computed: {
        getViewClass() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getFieldViewClass() {
            return this.full ? FIELD_VIEWS.full : FIELD_VIEWS.default;
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
.ui-range {
    display: flex;
    align-items: center;
    grid-column-gap: 12px;

    &.ui-range--full {
        width: 100%;
    }

    .ui-range__label {
        font-size: 14px;
        line-height: 21px;
        color: $txt-light;
    }

    .ui-range__field {
        appearance: none;
        height: 6px;
        background: $gray-100;
        border-radius: 40px;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            background: $main;
            border: 2px solid $white;
            border-radius: 50%;
            cursor: move;
        }

        &::-moz-range-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            background: $main;
            border: 2px solid $white;
            border-radius: 50%;
            cursor: move;
        }

        &::-ms-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            background: $main;
            border: 2px solid $white;
            border-radius: 50%;
            cursor: move;
        }

        &::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }

        &::-moz-range-track {
            appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }

        &::-ms-track {
            appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }
    }

    .ui-range__field--full {
        width: 100%;
    }
}

@media screen and (max-width: 1024px) {
    .ui-range {
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 10px;
    }
}
</style>
