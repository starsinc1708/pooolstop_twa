<template>
    <div class="ui-modal" :class="getViewClass" :style="getStyle">
        <div class="ui-modal__content" v-click-outside="onClose">
            <UIButton class="ui-modal__close" icon="cross" @clicked="onClose" />

            <slot></slot>
        </div>
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

import {autoOverflowY, hiddenOverflowY} from "@/utils/functions";

const VIEWS = {
    default: "",
    center: "ui-modal--center",
};

export default {
    name: "UIModal",
    components: {
        UIButton,
    },
    props: {
        padding: {
            type: String,
            default: "199",
        },
        center: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        hiddenOverflowY();
    },
    computed: {
        getStyle() {
            return {
                "padding-top": `${this.padding}px`,
            };
        },

        getViewClass() {
            return this.center ? VIEWS.center : VIEWS.default;
        },
    },
    methods: {
        onClose() {
            this.$emit("close");

            autoOverflowY();
        },
    },
};
</script>

<style lang="scss">
.ui-modal {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: rgba(34, 35, 39, 0.3);

    &.ui-modal--center {
        align-items: center;
    }

    .ui-modal__content {
        background: #ffffff;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
    }

    .ui-modal__close {
        position: absolute;
        top: 16px;
        right: 16px;
        fill: $txt-light;
    }
}

@media screen and (max-width: 768px) {
    .ui-modal {
        align-items: flex-end;
        padding-top: 0;

        &.ui-modal--center {
            align-items: flex-end;
        }

        .ui-modal__close {
            display: none;
        }

        .ui-modal__content {
            width: 100%;
            border-radius: 20px 20px 0 0;
        }
    }
}
</style>
