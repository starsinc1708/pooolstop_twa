<template>
    <div class="ui-device-global">
        <p class="ui-device-global__title">Global</p>

        <div class="ui-device-global__fields">
            <div
                class="ui-device-global__field"
                v-for="field in getFields"
                :key="field.id"
            >
                <p class="ui-device-global__label">
                    {{ field.label }}
                </p>

                <UICopy :text="field.text" />
            </div>
        </div>
    </div>
</template>

<script>
import UICopy from "@/components/ui/copy/copy.vue";

export default {
    name: "UIDeviceGlobal",
    components: {
        UICopy,
    },
    props: {
        stratum: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getFields() {
            const {stratum, stratum2, stratum3} = this.stratum;

            return [
                {
                    id: 0,
                    label: stratum,
                    text: this.onStratumReplace(stratum),
                },
                {
                    id: 1,
                    label: stratum2,
                    text: this.onStratumReplace(stratum2),
                },
                {
                    id: 2,
                    label: stratum3,
                    text: this.onStratumReplace(stratum3),
                },
            ].filter((field) => field.text && field.label);
        },
    },
    methods: {
        onStratumReplace(stratum) {
            return stratum ? stratum.replace("stratum+tcp://", "") : "";
        },
    },
};
</script>

<style lang="scss">
.ui-device-global {
    padding-bottom: 16px;
    border-bottom: 1px solid $gray;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .ui-device-global__title {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }

    .ui-device-global__fields {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 4px;
    }

    .ui-device-global__field {
        padding: 9px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .ui-device-global__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
