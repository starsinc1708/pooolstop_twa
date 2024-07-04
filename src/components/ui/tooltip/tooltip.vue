<template>
    <div class="ui-tooltip" :style="getStyle">
        <div class="ui-tooltip__content">
            <p class="ui-tooltip__label" v-if="label">
                {{ label }}
            </p>

            <slot></slot>

            <div
                class="ui-tooltip__triangle"
                :class="getTriangleViewClass"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UITooltip",
    props: {
        label: {
            type: String,
            default: "",
        },
        minWidth: {
            type: String,
            default: "260",
        },
        trianglePosition: {
            type: String,
            default: "left",
        },
    },
    computed: {
        getStyle() {
            return {
                "min-width": `${this.minWidth}px`,
            };
        },

        getTriangleViewClass() {
            return `ui-tooltip__triangle--${this.trianglePosition}`;
        },
    },
};
</script>

<style lang="scss">
.ui-tooltip {
    background: #212325;
    box-shadow: 0px 10px 40px rgba(33, 35, 37, 0.3);
    max-width: 260px;
    border-radius: 10px;
    transition: $transition;

    .ui-tooltip__content {
        position: relative;
        padding: 10px 13px;
    }

    .ui-tooltip__label {
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: $white;
    }

    .ui-tooltip__triangle {
        position: absolute;
        bottom: -8px;
        left: 50%;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #212325;
        transform: rotate(180deg) translateX(50%);
        box-shadow: 0px 10px 40px rgba(33, 35, 37, 0.3);
    }
}

@media screen and (max-width: 768px) {
    .ui-tooltip {
        .ui-tooltip__triangle--left {
            left: 13px;
            transform: rotate(180deg) translateX(0);
        }

        .ui-tooltip__triangle--right {
            right: 13px;
            left: auto;
            transform: rotate(180deg) translateX(0);
        }
    }
}
</style>
