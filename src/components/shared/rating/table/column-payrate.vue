<template>
    <div class="rating-table-column-payrate">
        <p class="rating-table-column-payrate__label">
            payrate

            <span class="rating-table-column-payrate__base"> base, BTC </span>
            <!-- <span class="rating-table-column-payrate__vip">/vip</span>, BTC -->
        </p>
    </div>
</template>

<script>
export default {
    name: "RatingTableColumnPayrate",
};
</script>

<style lang="scss">
.rating-table-column-payrate {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .rating-table-column-payrate__label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
        white-space: nowrap;
    }

    .rating-table-column-payrate__base {
        color: $main;
    }

    .rating-table-column-payrate__vip {
        text-decoration: underline dashed $txt-main;
    }
}

@media screen and (max-width: 1024px) {
    .rating-table-column-payrate {
        justify-content: flex-end;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-column-payrate {
        padding: 0 16px;

        .rating-table-column-payrate__label {
            font-size: 10px;
            line-height: 17px;
        }
    }
}
</style>
