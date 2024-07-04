<template>
    <div class="ui-info" v-click-outside="onHideTooltip">
        <button class="ui-info__toggle" @click="onToggle">
            <UISvg
                class="ui-info__toggle-icon"
                :class="getToggleIconViewClass"
                icon="info"
            />
        </button>

        <transition name="modal">
            <UITooltip
                class="ui-info__tooltip"
                :class="getTooltipViewClass"
                v-if="getTooltipIsShow"
                :label="label"
            >
                <slot></slot>
            </UITooltip>
        </transition>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UITooltip from "@/components/ui/tooltip/tooltip.vue";

const TOGGLE_ICON_VIEWS = {
    active: "ui-info__toggle-icon--active",
    black: "ui-info__toggle-icon--black",
};

const POSITIONS = {
    left: "ui-info__tooltip--left",
};

export default {
    name: "UIInfo",
    components: {
        UISvg,
        UITooltip,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        view: {
            type: String,
            default: "",
        },
        position: {
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
        getToggleIconViewClass() {
            const classes = [];

            if (this.toggle) {
                classes.push(TOGGLE_ICON_VIEWS.active);
            }

            if (this.view) {
                classes.push(TOGGLE_ICON_VIEWS[this.view]);
            }

            return classes.join(" ");
        },

        getTooltipViewClass() {
            const classes = [];

            if (this.position) {
                classes.push(POSITIONS[this.position]);
            }

            return classes.join(" ");
        },

        getTooltipIsShow() {
            return this.toggle;
        },
    },
    methods: {
        onToggle() {
            this.toggle = !this.toggle;
        },

        onHideTooltip() {
            this.toggle = false;
        },
    },
};
</script>

<style lang="scss">
.ui-info {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .ui-info__toggle {
        @include button-reset;

        &:hover {
            .ui-info__toggle-icon {
                fill: $main;
            }
        }
    }

    .ui-info__toggle-icon {
        fill: $txt-light;
    }

    .ui-info__toggle-icon--black {
        fill: $txt-main;
    }

    .ui-info__toggle-icon--active {
        fill: $main;
    }

    .ui-info__tooltip {
        position: absolute;
        bottom: 32px;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media screen and (max-width: 768px) {
    .ui-info {
        .ui-info__tooltip--left {
            left: -15px;
            transform: translateX(0);
        }
    }
}
</style>
