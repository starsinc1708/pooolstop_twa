<template>
    <div class="ui-input-code" :class="getViewClass">
        <p class="ui-input-code__label">
            {{ label }}
        </p>

        <div class="ui-input-code__fields">
            <input
                class="ui-input-code__field"
                :class="getFieldViewClass"
                ref="fieldOne"
                type="text"
                :value="fieldOne"
                @input="
                    onChangeField(
                        $event,
                        getFields.fieldOne,
                        getFields.fieldTwo
                    )
                "
            />

            <input
                class="ui-input-code__field"
                :class="getFieldViewClass"
                ref="fieldTwo"
                type="text"
                :value="fieldTwo"
                @input="
                    onChangeField(
                        $event,
                        getFields.fieldTwo,
                        getFields.fieldThree
                    )
                "
            />

            <input
                class="ui-input-code__field"
                :class="getFieldViewClass"
                ref="fieldThree"
                type="text"
                :value="fieldThree"
                @input="
                    onChangeField(
                        $event,
                        getFields.fieldThree,
                        getFields.fieldFour
                    )
                "
            />

            <input
                class="ui-input-code__field"
                :class="getFieldViewClass"
                ref="fieldFour"
                type="text"
                :value="fieldFour"
                @input="
                    onChangeField(
                        $event,
                        getFields.fieldFour,
                        getFields.fieldFive
                    )
                "
            />

            <input
                class="ui-input-code__field"
                :class="getFieldViewClass"
                ref="fieldFive"
                type="text"
                :value="fieldFive"
                @input="
                    onChangeField(
                        $event,
                        getFields.fieldFive,
                        getFields.fieldSix
                    )
                "
            />

            <input
                class="ui-input-code__field"
                :class="getFieldViewClass"
                ref="fieldSix"
                type="text"
                :value="fieldSix"
                @input="onChangeField($event, getFields.fieldSix)"
            />
        </div>

        <p class="ui-input-code__comment" v-if="comment">
            {{ comment }}
        </p>
    </div>
</template>

<script>
const VIEWS = {
    full: "ui-input-code--full",
    default: "",
};

const FIELD_VIEWS = {
    error: "ui-input-code__field--error",
    default: "",
};

const FIELDS = {
    fieldOne: "fieldOne",
    fieldTwo: "fieldTwo",
    fieldThree: "fieldThree",
    fieldFour: "fieldFour",
    fieldFive: "fieldFive",
    fieldSix: "fieldSix",
};

const MAX_LENGTH = 6;

export default {
    name: "UIInputCode",
    props: {
        label: {
            type: String,
            default: "",
        },
        comment: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        error: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false,
        },
        fieldOne: {
            type: String,
            default: "",
        },
        fieldTwo: {
            type: String,
            default: "",
        },
        fieldThree: {
            type: String,
            default: "",
        },
        fieldFour: {
            type: String,
            default: "",
        },
        fieldFive: {
            type: String,
            default: "",
        },
        fieldSix: {
            type: String,
            default: "",
        },
    },
    mounted() {
        this.onFocusFirstField();
    },
    computed: {
        getViewClass() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getFieldViewClass() {
            return this.error ? FIELD_VIEWS.error : FIELD_VIEWS.default;
        },

        getFields() {
            return FIELDS;
        },
    },
    methods: {
        onChangeField(event, currentField, nextField) {
            const value = event.target.value;
            const replacedValue = value.replace(/\D/g, "");

            if (replacedValue.length === MAX_LENGTH) {
                Object.values(FIELDS).forEach((field, fieldIndex) => {
                    const symbol = replacedValue[fieldIndex];

                    this.$refs[field].value = symbol;
                    this.$emit("field", {
                        key: field,
                        value: symbol,
                    });

                    this.$refs[field].focus();
                });
            } else {
                const symbol = replacedValue[0];

                if (symbol) {
                    this.$refs[currentField].value = symbol;

                    this.$emit("field", {
                        key: currentField,
                        value: symbol,
                    });

                    if (nextField) {
                        this.$refs[nextField].focus();
                    } else {
                        this.$refs[currentField].blur();
                    }
                } else {
                    this.$emit("field", {
                        key: currentField,
                        value: "",
                    });

                    this.$refs[currentField].value = "";
                }
            }
        },

        onFocusFirstField() {
            this.$refs[this.getFields.fieldOne].focus();
        },
    },
};
</script>

<style lang="scss">
.ui-input-code {
    &.ui-input-code--full {
        width: 100%;
    }

    .ui-input-code__label {
        @include golos-semi-bold;
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        margin-bottom: 12px;
    }

    .ui-input-code__comment {
        font-size: 12px;
        line-height: 16px;
        color: $txt-light;
        margin-top: 4px;
    }

    .ui-input-code__fields {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ui-input-code__field {
        @include input-reset;
        width: 50px;
        height: 48px;
        text-align: center;
        font-size: 20px;
        line-height: 24px;

        &.ui-input-code__field--error {
            border-color: $status-red;
        }
    }
}
</style>
