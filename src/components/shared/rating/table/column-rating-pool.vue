<template>
    <div class="rating-table-column-rating-pool">
        <p class="rating-table-column-rating-pool__label">Rating / pool</p>
    </div>
</template>

<script>
export default {
    name: "RatingTableColumnRatingPool",
};
</script>

<style lang="scss">
.rating-table-column-rating-pool {
    padding: 0 30px;
    display: flex;
    align-items: center;

    .rating-table-column-rating-pool__label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-column-rating-pool {
        padding: 0 16px;

        .rating-table-column-rating-pool__label {
            font-size: 10px;
            line-height: 16px;
        }
    }
}
</style>
