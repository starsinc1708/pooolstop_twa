<template>
    <div class="ui-select-options" :class="getViewClass">
        <div class="ui-select-options__wrapper">
            <button
                class="ui-select-options__option"
                v-for="option in options"
                :key="option.id"
                :class="[onOptionViewClass(option), getOptionViewClass]"
                @click="onOption(option)"
            >
                <UISvg
                    class="ui-select-options__icon"
                    v-if="option.icon"
                    :icon="option.icon"
                />

                <span>{{ option.label }}</span>
                <span>Min:{{ option.withdrawMin }} Fee:{{ option.withdrawFee }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const OPTION_VIEWS = {
    default: "",
    active: "ui-select-options__option--active",
};

export default {
    name: "UISelectOptions",
    components: {
        UISvg,
    },
    props: {
        value: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
        view: {
            type: String,
            default: "",
        },
    },
    computed: {
        getViewClass() {
            return `ui-select-options--${this.view}`;
        },

        getOptionViewClass() {
            return `ui-select-options__option--${this.view}`;
        },
    },
    methods: {
        onOptionViewClass({value}) {
            return this.value === value
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
.ui-select-options {
    background: $white;
    box-shadow: $cool-shadow;
    border-radius: 10px;
    padding: 4px;

    .ui-select-options__wrapper {
        @include scrollbar-y;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-height: 203px;
    }

    &.ui-select-options--gray {
        background: $gray-100;
        padding: 12px 14px;
        grid-row-gap: 12px;
        box-shadow: none;
    }

    .ui-select-options__option {
        @include button-reset;
        @include golos-regular;
        font-size: 14px;
        line-height: 16px;
        color: $txt-main;
        padding: 6px 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        grid-column-gap: 8px;
        border-radius: 8px;
        min-height: 42px;
    }

    .ui-select-options__option:hover {
        background-color: lightgray;
    }

    .ui-select-options__option--gray {
        color: $txt-main;
        padding: 0;

        &.ui-select-options__option--active {
            color: $main;
            background: none;
        }
    }

    .ui-select-options__option--active {
        background: $bg-light;
    }
}
</style>
