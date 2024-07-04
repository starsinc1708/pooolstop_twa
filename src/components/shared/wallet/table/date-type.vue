<template>
    <div class="wallet-table-date-type">
        <p class="wallet-table-date-type__date">
            {{ cell.date }}
        </p>

        <p class="wallet-table-date-type__type">
            {{ cell.type }}
        </p>
    </div>
</template>

<script>
export default {
    name: "WalletTableDateType",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.wallet-table-date-type {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-row-gap: 6px;

    .wallet-table-date-type__date {
        font-size: 11px;
        line-height: 12px;
        color: $txt-light;
    }

    .wallet-table-date-type__type {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .wallet-table-date-type {
        padding: 0 16px;

        .wallet-table-date-type__type {
            font-size: 13px;
            line-height: 17px;
        }
    }
}
</style>
