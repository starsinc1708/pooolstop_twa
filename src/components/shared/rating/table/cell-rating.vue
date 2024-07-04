<template>
    <div class="rating-table-cell-rating">
        <p class="rating-table-cell-rating__label">
            {{ cell.poolId }}
        </p>

        <a
            class="rating-table-cell-rating__link"
            v-if="cell.poolUrl"
            :href="cell.poolUrl"
            target="_blank"
        >
            <UISvg icon="share" />
        </a>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "RatingTableCellRating",
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
.rating-table-cell-rating {
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rating-table-cell-rating__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .rating-table-cell-rating__link {
        fill: rgba(65, 92, 107, 0.2);

        &:hover {
            fill: $main-hover;
        }
    }
}
</style>
