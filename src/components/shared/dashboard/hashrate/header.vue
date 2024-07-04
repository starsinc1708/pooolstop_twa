<template>
    <div class="dashboard-hashrate-header">
        <div class="dashboard-hashrate-header__block">
            <div class="dashboard-hashrate-header__group">
                <h2 class="dashboard-hashrate-header__title">Hashrate</h2>

                <DashboardHashrateTags
                    class="dashboard-hashrate-header__tags dashboard-hashrate-header__tags--top"
                    :dashboard="dashboard"
                />
            </div>

            <UITabs :tabs="getTabs" :tabActive="tab" @tab="onTab" />
        </div>

        <DashboardHashrateTags
            class="dashboard-hashrate-header__tags dashboard-hashrate-header__tags--bottom"
            :dashboard="dashboard"
        />
    </div>
</template>

<script>
import DashboardHashrateTags from "@/components/shared/dashboard/hashrate/tags.vue";
import UITabs from "@/components/ui/tabs/tabs.vue";

export const TAB_VALUES = {
    step1hour: 0,
    step4hour: 1,
    step1day: 2,
    step1month: 3,
};

export default {
    name: "DashboardHashrateHeader",
    components: {
        DashboardHashrateTags,
        UITabs,
    },
    props: {
        dashboard: {
            type: Object,
            required: true,
        },
        tab: {
            type: Number,
            required: true,
        },
    },
    computed: {
        getTabs() {
            return [
                {
                    id: 0,
                    label: "1h",
                    value: TAB_VALUES.step1hour,
                },
                {
                    id: 1,
                    label: "4h",
                    value: TAB_VALUES.step4hour,
                },
                {
                    id: 2,
                    label: "d",
                    value: TAB_VALUES.step1day,
                },
                {
                    id: 3,
                    label: "m",
                    value: TAB_VALUES.step1month,
                },
            ];
        },
    },
    methods: {
        onTab(tab) {
            this.$emit("onChangeTab", tab);
        },
    },
};
</script>

<style lang="scss">
.dashboard-hashrate-header {
    width: 100%;
    padding-left: 4px;

    .dashboard-hashrate-header__block {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .dashboard-hashrate-header__group {
        display: flex;
        align-items: flex-start;
        grid-column-gap: 60px;
    }

    .dashboard-hashrate-header__title {
        @include golos-semi-bold;
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
    }

    .dashboard-hashrate-header__tags--bottom {
        display: none;
    }
}

@media screen and (max-width: 1024px) {
    .dashboard-hashrate-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-row-gap: 20px;

        .dashboard-hashrate-header__tags--top {
            display: none;
        }

        .dashboard-hashrate-header__tags--bottom {
            display: flex;
        }
    }
}

@media screen and (max-width: 768px) {
    .dashboard-hashrate-header {
        padding-left: 0;

        .dashboard-hashrate-header__block {
            flex-direction: column;
            align-items: flex-start;
            grid-row-gap: 10px;
        }

        .dashboard-hashrate-header__title {
            font-size: 24px;
            line-height: 29px;
        }

        .dashboard-hashrate-header__tags--bottom {
            display: grid;
        }
    }
}
</style>
