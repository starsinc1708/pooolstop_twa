<template>
    <div class="ui-currency">
        <div class="ui-currency__group">
            <img class="ui-currency__icon" :src="getIcon" alt="bitcoin" />

            <div class="ui-currency__info">
                <p class="ui-currency__label">Available, {{ currency.coin }}</p>

                <h4 class="ui-currency__title">{{ currency.amount }}</h4>
            </div>
        </div>

        <div class="ui-currency__buttons">
            <div class="ui-currency__button">
                <transition name="modal">
                    <UITooltip
                        class="ui-currency__tooltip"
                        v-if="getDepositTooltipIsShow"
                        label="Deposit"
                        minWidth="160"
                        trianglePosition=""
                    />
                </transition>

                <UIIcon
                    icon="deposit"
                    view="active"
                    @clicked="onDeposit"
                    @mouseenter="onVisibleTooltip(getTooltips.deposit)"
                    @mouseleave="onHideTooltip"
                />
            </div>

            <div class="ui-currency__button">
                <transition name="modal">
                    <UITooltip
                        class="ui-currency__tooltip"
                        v-if="getWithdrawalTooltipIsShow"
                        label="Withdrawal"
                        minWidth="160"
                        trianglePosition=""
                    />
                </transition>

                <UIIcon
                    icon="withdraw"
                    view="active"
                    @clicked="onWithdraw"
                    @mouseenter="onVisibleTooltip(getTooltips.withdrawal)"
                    @mouseleave="onHideTooltip"
                />
            </div>
        </div>
    </div>
</template>

<script>
import UIIcon from "@/components/ui/icon/icon.vue";
import UITooltip from "@/components/ui/tooltip/tooltip.vue";

const ICONS = {
    BTC: require("@/assets/images/ui/currency/btc.svg"),
    USDT: require("@/assets/images/ui/currency/usdt.svg"),
};

const TOOLTIPS = {
    deposit: "deposit",
    withdrawal: "withdrawal",
    default: "",
};

export default {
    name: "UICurrency",
    components: {
        UIIcon,
        UITooltip,
    },
    props: {
        currency: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            tooltip: TOOLTIPS.default,
        };
    },
    computed: {
        getIcon() {
            return ICONS[this.currency.coin];
        },

        getTooltips() {
            return TOOLTIPS;
        },

        getDepositTooltipIsShow() {
            return this.tooltip === TOOLTIPS.deposit;
        },

        getWithdrawalTooltipIsShow() {
            return this.tooltip === TOOLTIPS.withdrawal;
        },
    },
    methods: {
        onDeposit() {
            this.$emit("deposit", this.currency);
        },

        onWithdraw() {
            this.$emit("withdraw", this.currency);
        },

        onVisibleTooltip(tooltip) {
            this.tooltip = tooltip;
        },

        onHideTooltip() {
            this.tooltip = TOOLTIPS.default;
        },
    },
};
</script>

<style lang="scss">
.ui-currency {
    padding: 11px 29px 12px 20px;
    background: $bg-gray-light;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 40px;

    .ui-currency__group {
        display: flex;
        align-items: center;
        grid-column-gap: 14px;
    }

    .ui-currency__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 2px;
    }

    .ui-currency__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
        white-space: nowrap;
    }

    .ui-currency__title {
        @include golos-medium;
        font-size: 18px;
        line-height: 22px;
        color: $txt-main;
        white-space: nowrap;
    }

    .ui-currency__buttons {
        display: flex;
        align-items: center;
        grid-column-gap: 28px;
    }

    .ui-currency__button {
        position: relative;
    }

    .ui-currency__tooltip {
        @include tooltip;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media screen and (max-width: 768px) {
    .ui-currency {
        padding: 8px 22px 9px 20px;
        grid-column-gap: 15px;

        .ui-currency__group {
            justify-content: space-between;
        }

        .ui-currency__info {
            grid-row-gap: 4px;
        }

        .ui-currency__label {
            font-size: 12px;
            line-height: 14px;
        }

        .ui-currency__title {
            font-size: 14px;
            line-height: 17px;
        }

        .ui-currency__buttons {
            grid-column-gap: 12px;
        }
    }
}
</style>
