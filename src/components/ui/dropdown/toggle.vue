<template>
    <button class="ui-dropdown-toggle" :disabled="disabled" @click="onToggle">
        <div class="ui-dropdown-toggle__group">
            <UISvg class="ui-dropdow-toggle__icon" :icon="getIcon" />

            <p class="ui-dropdown-toggle__label">
                {{ getLabel }}
            </p>
        </div>

        <UISvg
            class="ui-dropdown-toggle__chevron"
            :class="getIconViewClass"
            icon="chevronDown"
        />
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const ICON_VIEWS = {
    active: "ui-dropdown-toggle__icon--active",
    default: "",
};

export default {
    name: "UIDropdownToggle",
    components: {
        UISvg,
    },
    props: {
        toggle: {
            type: Boolean,
            required: true,
        },
        option: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        getIconViewClass() {
            return this.toggle ? ICON_VIEWS.active : ICON_VIEWS.default;
        },

        getOption() {
            return this.options.find((option) => option.value === this.option);
        },

        getLabel() {
            return this.getOption ? this.getOption.label : "";
        },

        getIcon() {
            return this.getOption ? this.getOption.icon : "";
        },
    },
    methods: {
        onToggle() {
            this.$emit("toggle");
        },
    },
};
</script>

<style lang="scss">
.ui-dropdown-toggle {
    @include button-reset;
    display: flex;
    align-items: center;
    grid-column-gap: 16px;

    .ui-dropdown-toggle__group {
        display: flex;
        align-items: center;
        grid-column-gap: 6px;
    }

    .ui-dropdown-toggle__label {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
    }

    .ui-dropdown-toggle__chevron {
        fill: $txt-light;
        margin-left: auto;
    }

    .ui-dropdown-toggle__icon--active {
        transform: rotate(180deg);
        fill: $main;
    }
}
</style>
