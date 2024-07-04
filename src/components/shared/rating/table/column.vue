<template>
    <div class="rating-table-column">
        <p class="rating-table-column__label" :class="getLabelViewClass">
            {{ column.label }}
        </p>

        <p
            class="rating-table-column__label rating-table-column__label--small"
            v-if="column.labelSmall"
        >
            {{ column.labelSmall }}
        </p>

        <UIInfo
            class="rating-table-column__info"
            v-if="column.info"
            :label="column.info"
            view="black"
        />

        <UIButton
            class="rating-table-column__sort"
            :class="getSortViewClass"
            v-if="column.sort"
            icon="sort"
            @clicked="onSort(column)"
        />
    </div>
</template>

<script>
import UIInfo from "@/components/ui/info/info.vue";
import UIButton from "@/components/ui/button/button.vue";

const LABEL_VIEWS = {
    default: "",
    active: "rating-table-column__label--active",
};

const SORT_VIEWS = {
    default: "",
    active: "rating-table-column__sort--active",
};

export default {
    name: "RatingTableColumn",
    components: {
        UIInfo,
        UIButton,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        sort: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getLabelViewClass() {
            return this.sort[this.column.key]
                ? LABEL_VIEWS.active
                : LABEL_VIEWS.default;
        },

        getSortViewClass() {
            return this.sort[this.column.key]
                ? SORT_VIEWS.active
                : SORT_VIEWS.default;
        },
    },
    methods: {
        onSort(column) {
            this.$emit("sort", column);
        },
    },
};
</script>

<style lang="scss">
.rating-table-column {
    padding: 0 30px;
    display: flex;
    align-items: center;

    .rating-table-column__label {
        @include golos-semi-bold;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
        transition: $transition;
    }

    .rating-table-column__label--small {
        display: none;
    }

    .rating-table-column__label--active {
        color: $main;
    }

    .rating-table-column__info {
        margin-left: 6px;
    }

    .rating-table-column__sort {
        margin-left: 8px;
        fill: $black;
    }

    .rating-table-column__sort--active {
        fill: $main;
    }
}

@media screen and (max-width: 1440px) {
    .rating-table-column {
        justify-content: flex-end;

        .rating-table-column__label {
            display: none;
        }

        .rating-table-column__label--small {
            display: block;
        }
    }
}

@media screen and (max-width: 768px) {
    .rating-table-column {
        padding: 0 16px;

        .rating-table-column__label--small {
            font-size: 10px;
            line-height: 16px;
        }
    }
}
</style>
