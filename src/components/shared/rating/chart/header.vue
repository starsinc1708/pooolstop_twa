<template>
    <div class="rating-chart-header">
        <h2 class="rating-chart-header__title">Chart</h2>

        <div class="rating-chart-header__group">
            <!-- <UISwitch
                label="Difficulty"
                :value="difficutly"
                @changed="onChangeDifficutly"
            /> -->

            <UIRange
                class="rating-chart-header__range"
                label="Scale"
                :value="scale"
                :max="max"
                :full="true"
                @changed="onChangeScale"
            />

            <!-- <UISwitch
                label="VIP Payrate"
                :value="payrate"
                @changed="onChangePayrate"
            /> -->
        </div>
    </div>
</template>

<script>
import UISwitch from "@/components/ui/switch/switch.vue";
import UIRange from "@/components/ui/range/range.vue";

export default {
    name: "RatingChartHeader",
    components: {
        UISwitch,
        UIRange,
    },
    props: {
        scale: {
            type: Number,
            required: true,
        },
        difficutly: {
            type: Number,
            required: true,
        },
        payrate: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onChangeDifficutly(difficutly) {
            this.$emit("difficutly", difficutly);
        },

        onChangePayrate(payrate) {
            this.$emit("payrate", payrate);
        },

        onChangeScale(scale) {
            this.$emit("scale", scale);
        },
    },
};
</script>

<style lang="scss">
.rating-chart-header {
    padding: 0 4px 0 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rating-chart-header__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
    }

    .rating-chart-header__group {
        display: flex;
        align-items: center;
        grid-column-gap: 40px;
    }

    .rating-chart-header__range {
        max-width: 159px;
    }
}

// @media screen and (max-width: 1024px) {
//     .rating-chart-header {
//         flex-direction: column;
//         align-items: flex-start;
//         grid-row-gap: 18px;

//         .rating-chart-header__group {
//             align-items: flex-start;
//         }
//     }
// }

@media screen and (max-width: 768px) {
    .rating-chart-header {
        padding: 0 9px 0 11px;

        .rating-chart-header__title {
            font-size: 24px;
            line-height: 29px;
        }

        .rating-chart-header__range {
            max-width: 110px;
        }
    }
}
</style>
