<template>
    <div class="rating-table-cell">
        <p class="rating-table-cell__label">
            {{ cell.label }}
        </p>
    </div>
</template>

<script>
export default {
    name: "RatingTableCell",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.rating-table-cell {
    padding: 0 30px;

    .rating-table-cell__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
