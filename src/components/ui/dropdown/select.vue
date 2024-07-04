<template>
    <div
        class="ui-dropdown-select"
        :class="getViewClass"
        v-click-outside="onHideOptions"
    >
        <UIDropdownToggle
            :toggle="toggle"
            :option="option"
            :options="options"
            :disabled="disabled"
            @toggle="onChangeToggle"
        />

        <UIDropdownOptions
            class="ui-dropdown-select__options"
            :class="getOptionsViewClass"
            :option="option"
            :options="options"
            @option="onOption"
        />
    </div>
</template>

<script>
import UIDropdownToggle from "@/components/ui/dropdown/toggle.vue";
import UIDropdownOptions from "@/components/ui/dropdown/options.vue";

const VIEWS = {
    default: "",
    disabled: "ui-dropdown-select--disabled",
};

const OPTIONS_VIEWS = {
    default: "",
    active: "ui-dropdown-select__options--active",
};

export default {
    name: "UIDropdownSelect",
    components: {
        UIDropdownToggle,
        UIDropdownOptions,
    },
    props: {
        option: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            toggle: false,
        };
    },
    computed: {
        getViewClass() {
            return this.disabled ? VIEWS.disabled : VIEWS.default;
        },

        getOptionsViewClass() {
            return this.toggle ? OPTIONS_VIEWS.active : OPTIONS_VIEWS.default;
        },
    },
    methods: {
        onChangeToggle() {
            this.toggle = !this.toggle;
        },

        onHideOptions() {
            this.toggle = false;
        },

        onOption(option) {
            this.toggle = false;

            this.$emit("option", option);
        },
    },
};
</script>

<style lang="scss">
.ui-dropdown-select {
    padding: 12px 16px;
    background: $gray-100;
    border-radius: 0 10px 10px 0;
    position: relative;
    height: 47.5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.ui-dropdown-select--disabled {
        opacity: $opacity;
    }

    &::before {
        position: absolute;
        content: "";
        height: 18px;
        width: 1px;
        background: $txt-light;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .ui-dropdown-select__options {
        position: absolute;
        top: 50px;
        right: 0;
        left: 0;
        visibility: hidden;
        opacity: 0;
        transition: $transition;
    }

    .ui-dropdown-select__options--active {
        visibility: visible;
        opacity: 1;
    }
}
</style>
