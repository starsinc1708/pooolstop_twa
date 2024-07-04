<template>
    <div class="rating-table-cell-payrate">
        <p class="rating-table-cell-payrate__label">
            {{ cell.base }}
        </p>
    </div>
</template>

<script>
export default {
    name: "RatingTableCellPayrate",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.rating-table-cell-payrate {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row-gap: 4px;

    .rating-table-cell-payrate__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 1024px) {
    .rating-table-cell-payrate {
        align-items: flex-end;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-cell-payrate {
        padding: 0 16px;
    }
}
</style>
