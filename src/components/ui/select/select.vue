<template>
    <div class="ui-select">
        <p class="ui-select__label" :class="getLabelViewClass" v-if="label">
            {{ label }}
        </p>

        <div class="ui-select__group" v-click-outside="onHideOptions">
            <UISelectToggle
                :toggle="toggle"
                :full="full"
                :disabled="disabled"
                :value="value"
                :options="options"
                :view="view"
                @toggle="onToggle"
            />

            <UISelectOptions
                class="ui-select__options"
                :class="getOptionsViewClass"
                :value="value"
                :options="options"
                :view="view"
                @option="onOption"
            />
        </div>

        <p class="ui-select__message" v-if="message">
            {{ message }}
        </p>
    </div>
</template>

<script>
import UISelectToggle from "@/components/ui/select/toggle.vue";
import UISelectOptions from "@/components/ui/select/options.vue";

const LABEL_VIEWS = {
    default: "",
    disabled: "ui-select__label--disabled",
};

const OPTIONS_VIEWS = {
    default: "",
    visible: "ui-select__options--visible",
};

export default {
    name: "UISelect",
    components: {
        UISelectToggle,
        UISelectOptions,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        full: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        view: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            toggle: false,
        };
    },
    computed: {
        getLabelViewClass() {
            return this.disabled ? LABEL_VIEWS.disabled : LABEL_VIEWS.default;
        },

        getOptionsViewClass() {
            return this.toggle ? OPTIONS_VIEWS.visible : OPTIONS_VIEWS.default;
        },
    },
    methods: {
        onToggle() {
            this.toggle = !this.toggle;
        },

        onOption(option) {
            this.toggle = false;

            this.$emit("option", option);
        },

        onHideOptions() {
            this.toggle = false;
        },
    },
};
</script>

<style lang="scss">
.ui-select {
    .ui-select__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
        margin-bottom: 9px;
    }

    .ui-select__label--disabled {
        opacity: $opacity;
    }

    .ui-select__group {
        position: relative;
    }

    .ui-select__options {
        position: absolute;
        top: 51px;
        left: 0;
        right: 0;
        opacity: 0;
        z-index: 100;
        visibility: hidden;
        transition: $transition;
    }

    .ui-select__options--visible {
        opacity: 1;
        visibility: visible;
    }

    .ui-select__message {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #f2a634;
        margin-top: 8px;
    }
}
</style>
