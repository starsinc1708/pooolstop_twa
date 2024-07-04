<template>
    <div class="wallet-confirm-result">
        <div class="wallet-confirm-result__content">
            <h4 class="wallet-confirm-result__title">
                {{ getWithdraw }}

                <br />

                {{ getWallet }}
            </h4>

            <div class="wallet-confirm-result__list">
                <div
                    class="wallet-confirm-result__item"
                    v-for="item in getList"
                    :key="item.id"
                >
                    <p class="wallet-confirm-result__label">
                        {{ item.label }}
                    </p>

                    <p class="wallet-confirm-result__label">
                        {{ item.value }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WalletConfirmResult",
    props: {
        confirm: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getWithdraw() {
            const {wallet, amount} = this.confirm;

            return `You withdraw: ${amount} ${wallet}`;
        },

        getWallet() {
            const {address, addressTag, network} = this.confirm;

            return `to the wallet: ${address} ${addressTag} network: ${network}`;
        },

        getList() {
            const {withdrawFee, wallet} = this.confirm;

            return [
                {
                    id: 0,
                    label: "Network fee",
                    value: `${withdrawFee} ${wallet}`,
                },
                // {
                //     id: 1,
                //     label: "You will receive",
                //     value: "0.19995 BTC",
                // },
            ];
        },
    },
};
</script>

<style lang="scss">
.wallet-confirm-result {
    background: $bg-light;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .wallet-confirm-result__content {
        padding: 24px 150px 26px 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-row-gap: 24px;
        width: 100%;
    }

    .wallet-confirm-result__title {
        @include golos-medium;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: $txt-main;
    }

    .wallet-confirm-result__list {
        display: flex;
        flex-direction: column;
        grid-row-gap: 4px;
        width: 100%;
    }

    .wallet-confirm-result__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .wallet-confirm-result__label {
        font-size: 12px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .wallet-confirm-result {
        .wallet-confirm-result__content {
            padding: 16px 0 12px 0;
            width: 360px;
            grid-row-gap: 28px;
        }
    }
}
</style>
