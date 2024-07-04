<template>
    <div class="rating-pools-header">
        <h2 class="rating-pools-header__title">Mining Pools</h2>

        <UITabs
            class="rating-pools-header__tabs"
            :tabs="getTabs"
            :tabActive="tab"
            :disabled="getDisabled"
            @tab="onTab"
        />

        <UISelect
            class="rating-pools-header__select"
            :options="getTabs"
            :value="tab"
            :full="true"
            :disabled="getDisabled"
            view="gray"
            @option="onTab"
        />
    </div>
</template>

<script>
import UITabs from "@/components/ui/tabs/tabs.vue";
import UISelect from "@/components/ui/select/select.vue";

import Api from "@/api/api";

const api = new Api();

export const TAB_VALUES = {
    step7days: "7",
    step30days: "30",
    step90days: "90",
    step180days: "180",
    step365days: "365",
};

export default {
    name: "RatingPoolsHeader",
    components: {
        UITabs,
        UISelect,
    },
    props: {
        tab: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getTabs() {
            return [
                {
                    id: 0,
                    label: "7 days",
                    value: TAB_VALUES.step7days,
                },
                {
                    id: 1,
                    label: "30 days",
                    value: TAB_VALUES.step30days,
                },
                {
                    id: 2,
                    label: "90 days",
                    value: TAB_VALUES.step90days,
                },
                {
                    id: 3,
                    label: "180 days",
                    value: TAB_VALUES.step180days,
                },
                {
                    id: 4,
                    label: "365 days",
                    value: TAB_VALUES.step365days,
                },
            ];
        },
    },
    methods: {
        async onTab(tab) {
            this.$emit("tab", tab);

            this.loading = true;

            await api.rating(tab.value).then((rating) => {
                this.$emit("rating", rating);

                this.loading = false;
            });
        },
    },
};
</script>

<style lang="scss">
.rating-pools-header {
    padding: 0 10px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rating-pools-header__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
    }

    .rating-pools-header__select {
        width: 135px;
        display: none;
    }
}

@media screen and (max-width: 1024px) {
    .rating-pools-header {
        .rating-pools-header__tabs {
            display: none;
        }

        .rating-pools-header__select {
            display: block;
        }
    }
}

@media screen and (max-width: 768px) {
    .rating-pools-header {
        padding: 0 16px;

        .rating-pools-header__title {
            font-size: 24px;
            line-height: 29px;
        }
    }
}
</style>
