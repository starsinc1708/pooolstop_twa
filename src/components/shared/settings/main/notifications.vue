<template>
    <div class="settings-main-notifications">
        <h2 class="settings-main-notifications__title">Email Notifications</h2>

        <div class="settings-main-notifications__groups">
            <SettingsMainOperations
                :loading="loading"
                :form="form"
                @checkbox="onChangeCheckbox"
            />

            <SettingsMainStatuses
                :loading="loading"
                :form="form"
                @checkbox="onChangeCheckbox"
            />
        </div>
    </div>
</template>

<script>
import SettingsMainOperations from "@/components/shared/settings/main/operations.vue";
import SettingsMainStatuses from "@/components/shared/settings/main/statuses.vue";

export const CHECKBOXES = {
    payout: "payout",
    rewards: "rewards",
    wallet: "wallet",
    withdrawal: "withdrawal",
    connectingWorker: "connectingWorker",
    disconnectingWorker: "disconnectingWorker",
};

export default {
    name: "SettingsMainNotifications",
    components: {
        SettingsMainOperations,
        SettingsMainStatuses,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            form: {
                payout: true,
                rewards: true,
                wallet: true,
                withdrawal: true,
                connectingWorker: true,
                disconnectingWorker: true,
            },
        };
    },
    methods: {
        onChangeCheckbox({key, value}) {
            this.form[key] = value;
        },
    },
};
</script>

<style lang="scss">
.settings-main-notifications {
    .settings-main-notifications__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
        margin-bottom: 32px;
    }

    .settings-main-notifications__groups {
        display: flex;
        flex-direction: column;
        grid-row-gap: 16px;
    }
}

@media screen and (max-width: 768px) {
    .settings-main-notifications {
        .settings-main-notifications__title {
            font-size: 24px;
            line-height: 29px;
            margin: 0 0 24px 4px;
        }
    }
}
</style>
