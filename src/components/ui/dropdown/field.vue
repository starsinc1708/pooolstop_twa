<template>
    <input
        class="ui-dropdown-field"
        type="text"
        :disabled="disabled"
        v-model="currentValue"
    />
</template>

<script>
export default {
    name: "UIDropdownField",
    props: {
        value: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
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
.ui-dropdown-field {
    @include golos-regular;
    background: $gray-100;
    padding: 15px 16px 15px 20px;
    border-radius: 10px 0 0 10px;
    border: none;
    outline: none;
    transition: $transition;
    color: $txt-main;
    border: none;
    font-size: 14px;
    line-height: 17px;
    color: $txt-main;
    width: 100%;

    &::placeholder {
        opacity: 1;
    }

    &:disabled {
        opacity: $opacity;
    }
}
</style>
