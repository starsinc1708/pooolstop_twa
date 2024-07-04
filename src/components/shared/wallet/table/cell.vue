<template>
    <div class="wallet-table-cell">
        <p class="wallet-table-cell__label">
            {{ cell.label }}
        </p>
    </div>
</template>

<script>
export default {
    name: "WalletTableCell",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.wallet-table-cell {
    padding: 0 30px;

    .wallet-table-cell__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        word-wrap: anywhere;
    }
}

@media screen and (max-width: 768px) {
    .wallet-table-cell {
        padding: 0 16px;

        .wallet-table-cell__label {
            font-size: 13px;
            line-height: 17px;
        }
    }
}
</style>
