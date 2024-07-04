<template>
    <div class="workers-header-tabs">
        <button
            class="workers-header-tabs__tab"
            :class="onTabViewClass(tab)"
            v-for="tab in getTabs"
            :key="tab.id"
            @click="onTab(tab)"
        >
            <img
                class="workers-header-tabs__tab-icon"
                v-if="tab.icon"
                :src="tab.icon"
                alt="icon"
            />

            {{ tab.label }}

            <span class="workers-header-tabs__tab-counter">
                ({{ tab.counter }})
            </span>
        </button>
    </div>
</template>

<script>
export const TABS = {
    all: "all",
    active: "active",
    unstable: "unstable",
    inactive: "inactive",
};

const TAB_VIEWS = {
    active: "workers-header-tabs__tab--active",
    default: "",
};

const TAB_ICONS = {
    all: "",
    active: require("@/assets/images/shared/workers/header/active.svg"),
    unstable: require("@/assets/images/shared/workers/header/unstable.svg"),
    inactive: require("@/assets/images/shared/workers/header/inactive.svg"),
};

export default {
    name: "WorkersHeaderTabs",
    props: {
        tab: {
            type: String,
            required: true,
        },
        workers: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        getTabs() {
            return [
                {
                    id: 0,
                    icon: TAB_ICONS.all,
                    label: TABS.all,
                    value: TABS.all,
                    counter: this.workers.length,
                },
                {
                    id: 1,
                    icon: TAB_ICONS.active,
                    label: TABS.active,
                    value: TABS.active,
                    counter: this.workers.filter((worker) => worker.active)
                        .length,
                },
                {
                    id: 2,
                    icon: TAB_ICONS.inactive,
                    label: TABS.inactive,
                    value: TABS.inactive,
                    counter: this.workers.filter((worker) => !worker.active)
                        .length,
                },
            ];
        },
    },
    methods: {
        onTabViewClass({value}) {
            return this.tab === value ? TAB_VIEWS.active : "";
        },

        onTab(tab) {
            this.$emit("tab", tab);
        },
    },
};
</script>

<style lang="scss">
.workers-header-tabs {
    display: flex;
    align-items: center;
    grid-column-gap: 2px;

    .workers-header-tabs__tab {
        @include button-reset;
        @include golos-medium;
        padding: 10px 10px 9px 10px;
        font-size: 12px;
        line-height: 17px;
        text-transform: uppercase;
        color: $txt-main;
        border-bottom: 2px solid transparent;
        display: flex;
        align-items: center;
    }

    .workers-header-tabs__tab--active {
        border-color: $main;
    }

    .workers-header-tabs__tab-icon {
        margin-right: 6px;
    }

    .workers-header-tabs__tab-counter {
        color: $txt-light;
        margin-left: 4px;
    }
}

@media screen and (max-width: 768px) {
    .workers-header-tabs {
        .workers-header-tabs__tab-icon {
            display: none;
        }
    }
}
</style>
