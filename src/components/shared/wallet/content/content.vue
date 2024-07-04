<template>
    <div class="wallet-content">
        <UIPageHeader
            title="Wallet"
            :okx="true"
            :total="true"
            :totalLabel="wallet.paid"
            :swap="true"
        />

        <div class="wallet-content__body">
            <WalletHeader
                :wallet="wallet"
                @deposit="onDeposit"
                @withdraw="onWithdraw"
                @component="onComponent"
            />

            <WalletTable
                :transactions="transactions"
                :loading="loading"
                :show="show"
                :detailed="detailed"
                @page="onChangePage"
                @detailed="onChangeDetailed"
            />
        </div>

        <transition name="modal" mode="out-in">
            <component
                class="wallet-content__modal"
                :is="getComponent"
                :currency="currency"
                :wallet="wallet"
                :withdraw="withdraw"
                :confirm="confirm"
                @wallet="onWallet"
                @refresh="refresh"
                @close="onComponent"
                @component="onComponent"
                @confirm="onConfirm"
            />
        </transition>
    </div>
</template>

<script>
import UIPageHeader from "@/components/ui/page-header/page-header.vue";
import WalletHeader from "@/components/shared/wallet/header/header.vue";
import WalletTable from "@/components/shared/wallet/table/table.vue";
import WalletSwap from "@/components/shared/wallet/swap/swap.vue";
import WalletDeposit from "@/components/shared/wallet/deposit/deposit.vue";
import WalletWithdraw from "@/components/shared/wallet/withdraw/withdraw.vue";
import WalletConfirm from "@/components/shared/wallet/confirm/confirm.vue";

export const COMPONENTS = {
    swap: "swap",
    deposit: "deposit",
    withdraw: "withdraw",
    confirm: "confirm",
    default: "",
};

export default {
    name: "WalletContent",
    components: {
        UIPageHeader,
        WalletHeader,
        WalletTable,
        WalletSwap,
        WalletDeposit,
        WalletWithdraw,
        WalletConfirm,
    },
    props: {
        wallet: {
            type: Object,
            required: true,
        },
        transactions: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
        detailed: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            component: COMPONENTS.default,
            currency: null,
            withdraw: null,
            confirm: null,
        };
    },
    computed: {
        getComponent() {
            switch (this.component) {
                case COMPONENTS.swap:
                    return WalletSwap;
                case COMPONENTS.deposit:
                    return WalletDeposit;
                case COMPONENTS.withdraw:
                    return WalletWithdraw;
                case COMPONENTS.confirm:
                    return WalletConfirm;
                default:
                    return COMPONENTS.default;
            }
        },
    },
    methods: {
        onDeposit(deposit) {
            this.currency = deposit;

            this.onComponent(COMPONENTS.deposit);
        },

        onWithdraw(withdraw) {
            this.currency = withdraw;

            this.onComponent(COMPONENTS.withdraw);
        },

        onComponent(component) {
            this.component = component;
        },

        onWallet(wallet) {
            this.$emit("wallet", wallet);
        },

        refresh() {
            this.$emit("refresh");
        },

        onConfirm(confirm) {
            this.confirm = confirm;
        },

        onChangePage() {
            this.$emit("page");
        },

        onChangeDetailed() {
            this.$emit("detailed");
        }
    },
};
</script>

<style lang="scss">
.wallet-content {
    display: flex;
    flex-direction: column;
    grid-row-gap: 24px;

    .wallet-content__body {
        background: #ffffff;
        border-radius: 16px;
        padding: 20px 20px 28px 20px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 20px;
    }

    .wallet-content__modal {
        @include modal;
    }
}
@media screen and (max-width: 768px) {
    .wallet-content {
        grid-row-gap: 28px;
        width: 100%;
        .wallet-content__body {
            padding: 0 0 28px 0;
            grid-row-gap: 24px;
        }
    }
}
</style>
