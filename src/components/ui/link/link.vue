<template>
    <router-link class="ui-link" :class="getViewClass" :to="to">
        {{ label }}
    </router-link>
</template>

<script>
const VIEWS = {
    "text-main": "ui-link--text-main",
    "main-outline": "ui-link--main-outline",
    full: "ui-link--full",
};

export default {
    name: "UILink",
    props: {
        label: {
            type: String,
            default: "",
        },
        to: {
            type: String,
            default: "",
        },
        view: {
            type: String,
            default: "",
        },
        full: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getViewClass() {
            const classes = [];

            if (this.full) {
                classes.push(VIEWS.full);
            }

            if (this.view) {
                classes.push(VIEWS[this.view]);
            }

            return classes.join(" ");
        },
    },
};
</script>

<style lang="scss">
.ui-link {
    display: inline-block;
    transition: $transition;

    &.ui-link--text-main {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $main;
    }

    &.ui-link--main-outline {
        @include main-outline;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &.ui-link--full {
        width: 100%;
    }
}
</style>
