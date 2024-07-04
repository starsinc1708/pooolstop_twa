<template>
    <div class="wallet-withdraw-results">
        <div
            class="wallet-withdraw-results__result"
            v-for="result in getResults"
            :key="result.id"
        >
            <p class="wallet-withdraw-results__label">
                {{ result.label }}
            </p>

            <p class="wallet-withdraw-results__label">
                {{ result.value }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "WalletWithdrawResults",
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getResults() {
            return [
                {
                    id: 0,
                    label: "Network fee",
                    value: this.form.withdrawFee,
                },
                {
                    id: 1,
                    label: "Network min",
                    value: this.form.withdrawMin,
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.wallet-withdraw-results {
    display: flex;
    flex-direction: column;
    grid-row-gap: 4px;

    .wallet-withdraw-results__result {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .wallet-withdraw-results__label {
        font-size: 12px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
