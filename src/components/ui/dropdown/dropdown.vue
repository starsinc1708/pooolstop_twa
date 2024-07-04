<template>
    <div class="ui-dropdown" :class="getViewClass">
        <p class="ui-dropdown__label" v-if="getLabelIsShow">
            {{ label }}
        </p>

        <div class="ui-dropdown__group" :class="getGroupViewClass">
            <UIDropdownField
                :value="value"
                :disabled="disabled"
                @changed="onChangeValue"
            />

            <UIDropdownSelect
                :options="options"
                :option="option"
                :disabled="disabled"
                @option="onOption"
            />
        </div>
    </div>
</template>

<script>
import UIDropdownField from "@/components/ui/dropdown/field.vue";
import UIDropdownSelect from "@/components/ui/dropdown/select.vue";

const VIEWS = {
    default: "",
    full: "ui-dropdown--full",
};

const GROUP_VIEWS = {
    default: "",
    full: "ui-dropdown__group--full",
};

export default {
    name: "UIDropdown",
    components: {
        UIDropdownField,
        UIDropdownSelect,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            default: "",
        },
        option: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
        full: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getLabelIsShow() {
            return this.label;
        },

        getViewClass() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getGroupViewClass() {
            return this.full ? GROUP_VIEWS.full : GROUP_VIEWS.default;
        },
    },
    methods: {
        onChangeValue(value) {
            this.$emit("changed", value);
        },

        onOption(option) {
            this.$emit("option", option);
        },
    },
};
</script>

<style lang="scss">
.ui-dropdown {
    display: flex;
    flex-direction: column;
    grid-row-gap: 4px;

    &.ui-dropdown--full {
        width: 100%;
    }

    .ui-dropdown__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }

    .ui-dropdown__group {
        display: flex;
        align-items: center;
    }

    .ui-dropdown__group--full {
        width: 100%;
    }
}
</style>
