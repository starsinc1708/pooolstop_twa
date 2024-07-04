<template>
    <UIModal class="ui-device" @close="onClose">
        <div class="ui-device__content">
            <UIDeviceHeader />

            <UIDeviceForm :stratum="getStratum" />
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import UIDeviceHeader from "@/components/ui/device/header.vue";
import UIDeviceForm from "@/components/ui/device/form.vue";

import {MODALS} from "@/store/modal.js";

import {autoOverflowY} from "@/utils/functions.js";

export default {
    name: "UIDevice",
    components: {
        UIModal,
        UIDeviceHeader,
        UIDeviceForm,
    },
    computed: {
        getStratum() {
            return this.$store.state.stratum;
        },
    },
    methods: {
        onClose() {
            this.$store.commit("modal/setModal", MODALS.default);

            autoOverflowY();
        },
    },
};
</script>

<style lang="scss">
.ui-device {
    .ui-device__content {
        width: 640px;
        padding: 48px 150px 64px 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-row-gap: 32px;
    }
}

@media screen and (max-width: 768px) {
    .ui-device {
        .ui-device__content {
            width: 360px;
            padding: 32px 0 24px 0;
            margin: 0 auto;
            grid-row-gap: 24px;
        }
    }
}
</style>
