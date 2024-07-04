<template>
    <div class="wallet-header-swap">
        <transition name="modal">
            <UITooltip
                class="wallet-header-swap__tooltip"
                v-if="getTooltipIsShow"
                minWidth="160"
                trianglePosition="right"
                label="Exchange"
            />
        </transition>

        <UIIcon
            class="wallet-header-swap__icon"
            icon="swap"
            view="active"
            @clicked="onSwap"
            @mouseenter="onVisibleTooltip"
            @mouseleave="onHideTooltip"
        />
    </div>
</template>

<script>
import UITooltip from "@/components/ui/tooltip/tooltip.vue";
import UIIcon from "@/components/ui/icon/icon.vue";

export default {
    name: "WalletHeaderSwap",
    components: {
        UITooltip,
        UIIcon,
    },
    data() {
        return {
            tooltip: false,
        };
    },
    computed: {
        getTooltipIsShow() {
            return this.tooltip;
        },
    },
    methods: {
        onSwap() {
            this.$emit("swap");
        },

        onVisibleTooltip() {
            this.tooltip = true;
        },

        onHideTooltip() {
            this.tooltip = false;
        },
    },
};
</script>

<style lang="scss">
.wallet-header-swap {
    position: relative;

    .wallet-header-swap__tooltip {
        @include tooltip;
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media screen and (max-width: 768px) {
    .wallet-header-swap {
        .wallet-header-swap__tooltip {
            left: auto;
            right: 0;
            transform: translateX(0);
        }
    }
}
</style>
