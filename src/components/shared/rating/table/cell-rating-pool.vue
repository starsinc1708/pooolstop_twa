<template>
    <div class="rating-table-cell-rating-pool">
        <p class="rating-table-cell-rating-pool__label">
            {{ cell.poolId }}
        </p>

        <p class="rating-table-cell-rating-pool__label">
            {{ cell.pool }}
        </p>

        <!-- <div class="rating-table-cell-rating-pool__info">
            <UISvg :icon="cell.pool" />

            <p class="rating-table-cell-rating-pool__percent">
                {{ cell.percent }}%
            </p>
        </div> -->
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "RatingTableCellRatingPool",
    components: {
        UISvg,
    },
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.rating-table-cell-rating-pool {
    padding: 0 30px;
    display: flex;
    align-items: center;
    grid-column-gap: 19px;

    .rating-table-cell-rating-pool__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .rating-table-cell-rating-pool__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 4px;
    }

    .rating-table-cell-rating-pool__percent {
        font-size: 12px;
        line-height: 12px;
        color: $txt-light;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-cell-rating-pool {
        padding: 0 16px;
    }
}
</style>
