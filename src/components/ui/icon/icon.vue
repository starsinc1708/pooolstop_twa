<template>
    <button
        class="ui-icon"
        :class="getViewClass"
        :disabled="disabled"
        @click="onClick"
    >
        <UISvg class="ui-icon__icon" :icon="icon" />
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

const VIEWS = {
    default: "",
};

export default {
    name: "UIIcon",
    components: {
        UISvg,
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        view: {
            type: String,
            default: "",
        },
    },
    computed: {
        getViewClass() {
            return this.view ? `ui-icon--${this.view}` : VIEWS.default;
        },
    },
    methods: {
        onClick() {
            this.$emit("clicked");
        },
    },
};
</script>

<style lang="scss">
.ui-icon {
    @include button-reset;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-gap: 8px;

    &.ui-icon--active {
        width: 36px;
        height: 36px;

        .ui-icon__icon {
            fill: $main;
        }
    }

    &:hover {
        background: rgba(65, 92, 107, 0.1);

        .ui-icon__icon {
            fill: $main;
        }
    }

    &:disabled {
        background: none;

        .ui-icon__icon {
            fill: rgba(65, 92, 107, 0.2);
        }
    }

    .ui-icon__icon {
        fill: rgba(65, 92, 107, 0.2);
    }
}

@media screen and (max-width: 768px) {
    .ui-icon {
        width: 36px;
        height: 36px;
    }
}
</style>
