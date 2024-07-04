<template>
    <div class="wallet-table-status">
        <p class="wallet-table-status__label" :class="getLabelViewClass">
            {{ cell.label }}
        </p>
    </div>
</template>

<script>
const LABEL_VIEWS = {
    Failed: "wallet-table-status__label--red",
    Success: "",
};

export default {
    name: "WalletTableStatus",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getLabelViewClass() {
            return LABEL_VIEWS[this.cell.label];
        },
    },
};
</script>

<style lang="scss">
.wallet-table-status {
    padding: 0 30px;

    .wallet-table-status__label {
        font-size: 14px;
        line-height: 17px;
    }

    .wallet-table-status__label--red {
        color: $status-red;
    }
}
</style>
