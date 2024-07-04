<template>
    <div class="rating">
        <RatingContent
            :tab="tab"
            :rating="rating"
            @tab="onTab"
            @rating="onRating"
        />
    </div>
</template>

<script>
import RatingContent from "@/components/shared/rating/content/content.vue";

import {TAB_VALUES} from "@/components/shared/rating/pools/header.vue";

import Api from "@/api/api";

const api = new Api();

const DEFAULT_FIXED_VALUE = 8;

export default {
    name: "Rating",
    components: {
        RatingContent,
    },
    data() {
        return {
            tab: TAB_VALUES.step7days,
            rating: [],
        };
    },
    async created() {
        await api.rating(this.tab).then((rating) => {
            this.onRating(rating);
        });
    },
    methods: {
        onTab({value}) {
            this.tab = value;
        },

        onRating(rating) {
            this.rating = rating.map((element) => {
                const roundedRates = {};

                for (const [date, rate] of Object.entries(element.rates)) {
                    roundedRates[date] = Number(
                        rate.toFixed(DEFAULT_FIXED_VALUE)
                    );
                }

                return {
                    ...element,
                    avrRate: Number(
                        element.avrRate.toFixed(DEFAULT_FIXED_VALUE)
                    ),
                    rates: roundedRates,
                };
            });
        },
    },
};
</script>
