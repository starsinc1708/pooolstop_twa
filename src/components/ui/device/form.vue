<template>
    <div class="ui-device-form">
        <UIDeviceGlobal :stratum="stratum" />

        <UIDeviceWorker :stratum="stratum" />
    </div>
</template>

<script>
import UIDeviceGlobal from "@/components/ui/device/global.vue";
import UIDeviceWorker from "@/components/ui/device/worker.vue";

export default {
    name: "UIDeviceForm",
    components: {
        UIDeviceGlobal,
        UIDeviceWorker,
    },
    props: {
        stratum: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.ui-device-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-row-gap: 32px;
}
</style>
