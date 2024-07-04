<template>
    <button class="ui-toolbar-service" @click="onAddService">
        <UISvg icon="plus" />

        Add device
    </button>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

import {MODALS} from "@/store/modal.js";

export default {
    name: "UIToolbarService",
    components: {
        UISvg,
    },
    methods: {
        onAddService() {
            this.$store.commit("modal/setModal", MODALS.device);
        },
    },
};
</script>

<style lang="scss">
.ui-toolbar-service {
    @include button-reset;
    @include golos-medium;
    padding: 14px 10px 20px;
    border: 1px dashed rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-row-gap: 4px;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    width: 116px;

    &:hover {
        border-color: $white;
        color: $white;
    }

    &:active {
        background: #2b97e0;
        border-color: $white;
        color: $white;
    }
}
</style>
