<template>
    <div class="ui-device-worker">
        <div class="ui-device-worker__header">
            <p class="ui-device-worker__header-label">Worker configuration</p>

            <UICopy :text="getText" />
        </div>

        <div class="ui-device-worker__group">
            <p class="ui-device-worker__label">{{ stratum.account }}.</p>

            <input
                class="ui-device-worker__field"
                type="text"
                placeholder="Customize worker name"
                :value="workerName"
                @input="onChangeWorkerName"
            />
        </div>
    </div>
</template>

<script>
import UICopy from "@/components/ui/copy/copy.vue";

export default {
    name: "UIDeviceWorker",
    components: {
        UICopy,
    },
    props: {
        stratum: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            workerName: "",
        };
    },
    computed: {
        getText() {
            return `${this.stratum.account}.${this.workerName}`;
        },
    },
    methods: {
        onChangeWorkerName(event) {
            const value = event.target.value
                .replace(/[^a-zA-Z0-9]/g, "")
                .replace(/[.,!?;:'"-]/g, "");

            this.workerName = value;
            event.target.value = value;
        },
    },
};
</script>

<style lang="scss">
.ui-device-worker {
    display: flex;
    flex-direction: column;
    grid-row-gap: 4px;

    .ui-device-worker__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ui-device-worker__header-label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }

    .ui-device-worker__group {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .ui-device-worker__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .ui-device-worker__field {
        @include input-reset;
        padding: 15px 16px;
        width: 100%;
        font-size: 14px;
        line-height: 17px;
    }
}
</style>
