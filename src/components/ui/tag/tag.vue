<template>
    <div class="ui-tag" :class="getViewClass">
        <h4 class="ui-tag__title" :class="getTitleViewClass">
            {{ tag.value }}
        </h4>

        <p class="ui-tag__label">{{ tag.label }}</p>
    </div>
</template>

<script>
export const VIEWS = {
    green: "ui-tag--green",
    purple: "ui-tag--purple",
    orange: "ui-tag--orange",
    small: "ui-tag--small",
};

const TITLE_VIEWS = {
    default: "",
    small: "ui-tag__title--small",
};

export default {
    name: "UITag",
    props: {
        tag: {
            type: Object,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getViewClass() {
            const classes = [this.tag.view];

            if (this.small) {
                classes.push(VIEWS.small);
            }

            return classes.join(" ");
        },

        getTitleViewClass() {
            return this.small ? TITLE_VIEWS.small : TITLE_VIEWS.default;
        },
    },
};
</script>

<style lang="scss">
.ui-tag {
    padding: 10px 22px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-row-gap: 2px;

    &.ui-tag--green {
        background: $bg-green;
    }

    &.ui-tag--purple {
        background: $bg-purple;
    }

    &.ui-tag--orange {
        background: $bg-orange;
    }

    .ui-tag__title {
        @include golos-semi-bold;
        font-size: 24px;
        line-height: 29px;
        color: $txt-main;
    }

    .ui-tag__label {
        @include golos-regular;
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
        white-space: nowrap;
    }
}

@media screen and (max-width: 768px) {
    .ui-tag {
        border-radius: 10px;
        padding: 5px 22px 7px 22px;
        grid-row-gap: 0;

        &.ui-tag--small {
            padding: 6px 12px 7px 14px;
        }

        .ui-tag__title {
            font-size: 20px;
            line-height: 24px;
        }

        .ui-tag__title--small {
            font-size: 16px;
            line-height: 19px;
        }

        .ui-tag__label {
            font-size: 12px;
            line-height: 14px;
        }
    }
}
</style>
