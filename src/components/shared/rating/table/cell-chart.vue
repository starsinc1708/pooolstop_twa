<template>
    <div class="rating-table-cell-chart">
        <UICheckbox :value="active" @changed="onChart" />
    </div>
</template>

<script>
import UICheckbox from "@/components/ui/checkbox/checkbox.vue";

export default {
    name: "RatingTableCellChart",
    components: {
        UICheckbox,
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onChart(value) {
            if (value) {
                this.$emit("add");
            } else {
                this.$emit("remove");
            }
        },
    },
};
</script>

<style lang="scss">
.rating-table-cell-chart {
    padding: 0 30px;
    display: flex;
    align-items: center;
}

@media screen and (max-width: 1440px) {
    .rating-table-cell-chart {
        justify-content: flex-end;
    }
}

@media screen and (max-width: 768px) {
    .rating-table-cell-chart {
        padding: 0 16px;
    }
}
</style>
