<template>
    <div class="settings-main-statuses">
        <h4 class="settings-main-statuses__title">Mining Statuses</h4>

        <div class="settings-main-statuses__checkboxes">
            <div class="settings-main-statuses__checkbox">
                <p class="settings-main-statuses__checkbox-label">
                    Connecting the Worker
                </p>

                <UICheckbox
                    :value="form.connectingWorker"
                    :small="true"
                    :disabled="getDisabled"
                    @changed="
                        onChangeCheckbox(getCheckboxes.connectingWorker, $event)
                    "
                />
            </div>

            <div class="settings-main-statuses__checkbox">
                <p class="settings-main-statuses__checkbox-label">
                    Disconnecting the Worker
                </p>

                <UICheckbox
                    :value="form.disconnectingWorker"
                    :small="true"
                    :disabled="getDisabled"
                    @changed="
                        onChangeCheckbox(
                            getCheckboxes.disconnectingWorker,
                            $event
                        )
                    "
                />
            </div>
        </div>
    </div>
</template>

<script>
import UICheckbox from "@/components/ui/checkbox/checkbox.vue";

import {CHECKBOXES} from "@/components/shared/settings/main/notifications.vue";

export default {
    name: "SettingsMainStatuses",
    components: {
        UICheckbox,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        form: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getCheckboxes() {
            return CHECKBOXES;
        },
    },
    methods: {
        onChangeCheckbox(key, value) {
            this.$emit("checkbox", {key, value});
        },
    },
};
</script>

<style lang="scss">
.settings-main-statuses {
    .settings-main-statuses__title {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        margin-bottom: 6px;
    }

    .settings-main-statuses__checkboxes {
        display: flex;
        flex-direction: column;
        grid-row-gap: 6px;
    }

    .settings-main-statuses__checkbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 16px;
    }

    .settings-main-statuses__checkbox-label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
