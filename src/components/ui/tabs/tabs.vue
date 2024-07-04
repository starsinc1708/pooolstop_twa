<template>
    <div class="ui-tabs">
        <button
            class="ui-tabs__tab"
            :class="onTabViewClass(tab)"
            v-for="tab in tabs"
            :key="tab.id"
            :disabled="disabled"
            @click="onTab(tab)"
        >
            {{ tab.label }}
        </button>
    </div>
</template>

<script>
const TAB_VIEWS = {
    default: "",
    active: "ui-tabs__tab--active",
};

export default {
    name: "UITabs",
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
        tabActive: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onTabViewClass({value}) {
            return this.tabActive === value
                ? TAB_VIEWS.active
                : TAB_VIEWS.default;
        },

        onTab(tab) {
            this.$emit("tab", tab);
        },
    },
};
</script>

<style lang="scss">
.ui-tabs {
    display: flex;
    align-items: center;
    background: $bg-light;
    border-radius: 10px;
    padding: 2px;

    .ui-tabs__tab {
        @include button-reset;
        @include golos-regular;
        font-size: 14px;
        line-height: 16px;
        color: rgba(34, 35, 39, 0.7);
        padding: 8px 25px;
        border-radius: 9px;

        &:disabled {
            opacity: $opacity;
            cursor: default;
        }
    }

    .ui-tabs__tab--active {
        background: $white;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .ui-tabs {
        .ui-tabs__tab {
            padding: 8px 12px;
            font-size: 14px;
            line-height: 17px;
            min-width: 56px;
        }
    }
}
</style>
