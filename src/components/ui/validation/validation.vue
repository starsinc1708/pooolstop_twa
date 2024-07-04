<template>
    <div class="ui-validation">
        <p class="ui-validation__label">Password must:</p>

        <div class="ui-validation__list">
            <div
                class="ui-validation__item"
                v-for="item in validation"
                :key="item.id"
            >
                <img
                    class="ui-validation__item-icon"
                    :src="onIcon(item)"
                    alt="icon"
                />

                <p
                    class="ui-validation__item-label"
                    :class="onLabelViewClass(item)"
                >
                    {{ item.label }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
const ICONS = {
    default: require("@/assets/images/shared/registration/password/error-default.svg"),
    green: require("@/assets/images/shared/registration/password/error-green.svg"),
    red: require("@/assets/images/shared/registration/password/error-red.svg"),
};

const VIEWS = {
    default: "",
    green: "ui-validation__item-label--green",
    red: "ui-validation__item-label--red",
};

export default {
    name: "UIValidation",
    props: {
        validation: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onIcon({validation}) {
            return ICONS[validation];
        },

        onLabelViewClass({validation}) {
            return VIEWS[validation];
        },
    },
};
</script>

<style lang="scss">
.ui-validation {
    .ui-validation__label {
        @include golos-regular;
        font-size: 12px;
        line-height: 16px;
        color: $txt-light;
        margin-bottom: 4px;
    }

    .ui-validation__list {
        display: flex;
        flex-direction: column;
        grid-row-gap: 4px;
    }

    .ui-validation__item {
        display: flex;
        align-items: center;
        grid-column-gap: 6px;
    }

    .ui-validation__item-label {
        @include golos-regular;
        font-size: 12px;
        line-height: 16px;
        color: $txt-light;

        &.ui-validation__item-label--green {
            color: $status-green;
        }

        &.ui-validation__item-label--red {
            color: $status-red;
        }
    }
}
</style>
