<template>
    <button class="ui-download" :disabled="disabled" @click="onDownload">
        <UISvg class="ui-download__icon" icon="download" />

        Download
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "UIDownload",
    components: {
        UISvg,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onDownload() {
            this.$emit('onDownload')
        },
    },
};
</script>

<style lang="scss">
.ui-download {
    @include button-reset;
    @include golos-regular;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-gap: 12px;
    font-size: 14px;
    line-height: 16px;
    color: $txt-main;
    padding: 10px 22px 10px 14px;
    border: 1px solid $gray-100;
    border-radius: 10px;

    &:hover {
        border-color: $main-hover;

        .ui-download__icon {
            fill: $main-hover;
        }
    }

    &:active {
        .ui-download__icon {
            fill: $main-active;
        }
    }

    &:disabled {
        opacity: $opacity;

        &:hover {
            border-color: $gray-100;
        }

        .ui-download__icon {
            fill: $txt-light;
        }
    }

    .ui-download__icon {
        fill: $txt-light;
    }
}
</style>
