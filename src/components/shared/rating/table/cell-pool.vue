<template>
    <div class="rating-table-cell-pool">
        {{ cell.pool }}
    </div>
</template>

<script>
export default {
    name: "RatingTableCellPool",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.rating-table-cell-pool {
    padding: 0 30px;
    display: flex;
    align-items: center;
}
</style>
