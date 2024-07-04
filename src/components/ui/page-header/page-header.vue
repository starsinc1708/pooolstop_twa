<template>
    <div class="ui-page-header">
        <div class="ui-page-header__group">
            <h1 class="ui-page-header__title">
                {{ title }}
            </h1>

            <!-- <UIOkx class="ui-page-header__okx" v-if="okx" /> -->
        </div>

        <div class="ui-page-header__block">
            <UIButton
                v-if="device"
                label="Add Device"
                view="main"
                size="small"
                icon="plusWhite"
                @clicked="onAddDevice"
            />

            <UIPageHeaderSwap v-if="swap" />

            <UIPageHeaderTotal v-if="total" :label="totalLabel" />
        </div>
    </div>
</template>

<script>
import UIOkx from "@/components/ui/okx/okx.vue";
import UIButton from "@/components/ui/button/button.vue";
import UIPageHeaderSwap from "@/components/ui/page-header/swap.vue";
import UIPageHeaderTotal from "@/components/ui/page-header/total.vue";

import {MODALS} from "@/store/modal.js";

export default {
    name: "UIPageHeader",
    components: {
        UIOkx,
        UIButton,
        UIPageHeaderSwap,
        UIPageHeaderTotal,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        device: {
            type: Boolean,
            default: false,
        },
        okx: {
            type: Boolean,
            default: false,
        },
        total: {
            type: Boolean,
            default: false,
        },
        totalLabel: {
            type: String,
            default: "",
        },
        swap: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onAddDevice() {
            this.$store.commit("modal/setModal", MODALS.device);
        },
    },
};
</script>

<style lang="scss">
.ui-page-header {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ui-page-header__group {
        display: flex;
        align-items: center;
        grid-column-gap: 24px;
    }

    .ui-page-header__title {
        font-size: 32px;
        line-height: 38px;
        color: $txt-main;
    }

    .ui-page-header__block {
        display: flex;
        align-items: center;
        grid-column-gap: 32px;
    }
}

@media screen and (max-width: 1024px) {
    .ui-page-header {
        .ui-page-header__block {
            grid-column-gap: 15px;
        }
    }
}

@media screen and (max-width: 768px) {
    .ui-page-header {
        padding: 0 12px;

        .ui-page-header__title {
            font-size: 28px;
            line-height: 34px;
        }

        .ui-page-header__okx {
            display: none;
        }
    }
}
</style>
