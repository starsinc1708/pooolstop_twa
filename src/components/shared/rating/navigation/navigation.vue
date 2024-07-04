<template>
    <div class="rating-navigation" :class="getViewClass">
        <p class="rating-navigation__label">Chart</p>

        <UISvg icon="arrowDown" />
    </div>
</template>

<script>
import {throttle} from "lodash";

import UISvg from "@/components/ui/svg/svg.vue";

const VIEWS = {
    default: "",
    visible: "rating-navigation--visible",
};

export default {
    name: "RatingNavigation",
    components: {
        UISvg,
    },
    props: {
        charts: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            view: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    },
    computed: {
        getViewClass() {
            return this.charts.length && this.view
                ? VIEWS.visible
                : VIEWS.default;
        },

        getRatingChart() {
            return document.getElementById("rating-chart");
        },
    },
    methods: {
        onScroll: throttle(function () {
            const {offsetTop, offsetHeight} = this.getRatingChart;

            const offsetY = window.pageYOffset;

            if (offsetY < offsetTop - offsetHeight) {
                this.view = true;
            } else {
                this.view = false;
            }
        }, 300),
    },
};
</script>

<style lang="scss">
.rating-navigation {
    background: $main;
    border-radius: 16px;
    display: flex;
    align-items: center;
    grid-column-gap: 83px;
    padding: 7px 16px;
    max-width: 180px;
    visibility: hidden;
    opacity: 0;
    transition: $transition;

    &.rating-navigation--visible {
        visibility: visible;
        opacity: 1;
    }

    .rating-navigation__label {
        @include golos-semi-bold;
        font-size: 20px;
        line-height: 30px;
        color: $white;
    }
}
</style>
