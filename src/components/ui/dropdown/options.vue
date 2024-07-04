<template>
    <div class="ui-dropdown-options">
        <button
            class="ui-dropdown-options__option"
            v-for="option in options"
            :key="option.id"
            :class="onOptionViewClass(option)"
            @click="onOption(option)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<script>
const OPTION_VIEWS = {
    default: "",
    active: "ui-dropdown-options__option--active",
};

export default {
    name: "UIDropdownOptions",
    props: {
        option: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        onOptionViewClass({value}) {
            return this.option === value
                ? OPTION_VIEWS.active
                : OPTION_VIEWS.default;
        },

        onOption(option) {
            this.$emit("option", option);
        },
    },
};
</script>

<style lang="scss">
.ui-dropdown-options {
    padding: 4px 16px 4px 14px;
    background: $gray-100;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .ui-dropdown-options__option {
        @include button-reset;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding: 10px 0;
    }

    .ui-dropdown-options__option--active {
        color: $main;
    }
}
</style>
