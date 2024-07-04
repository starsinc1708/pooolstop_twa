<template>
    <div class="ui-page-header-total">
        <p class="ui-page-header-total__label">Total paid, BTC</p>

        <h4 class="ui-page-header-total__title">{{ getLabel }}</h4>
    </div>
</template>

<script>
import {getFixedBtcValue} from "@/utils/functions.js";

export default {
    name: "UIPageHeaderTotal",
    props: {
        label: {
            type: String,
            default: "",
        },
    },
    computed: {
        getLabel() {
            return getFixedBtcValue(this.label);
        },
    },
};
</script>

<style lang="scss">
.ui-page-header-total {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    grid-row-gap: 2px;

    .ui-page-header-total__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
    }

    .ui-page-header-total__title {
        @include golos-medium;
        font-size: 18px;
        line-height: 22px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .ui-page-header-total {
        grid-row-gap: 4px;

        .ui-page-header-total__label {
            font-size: 12px;
            line-height: 14px;
        }

        .ui-page-header-total__title {
            font-size: 14px;
            line-height: 17px;
        }
    }
}
</style>
