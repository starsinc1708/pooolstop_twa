<template>
    <div class="settings-main-operations">
        <h4 class="settings-main-operations__title">Financial Operations</h4>

        <div class="settings-main-operations__checkboxes">
            <div class="settings-main-operations__checkbox">
                <p class="settings-main-operations__checkbox-label">
                    Mining Payout
                </p>

                <UICheckbox
                    :value="form.payout"
                    :small="true"
                    :disabled="getDisabled"
                    @changed="onChangeCheckbox(getCheckboxes.payout, $event)"
                />
            </div>

            <div class="settings-main-operations__checkbox">
                <p class="settings-main-operations__checkbox-label">
                    Mining Rewards
                </p>

                <UICheckbox
                    :value="form.rewards"
                    :small="true"
                    :disabled="getDisabled"
                    @changed="onChangeCheckbox(getCheckboxes.rewards, $event)"
                />
            </div>

            <div class="settings-main-operations__checkbox">
                <p class="settings-main-operations__checkbox-label">
                    Top up Wallet
                </p>

                <UICheckbox
                    :value="form.wallet"
                    :small="true"
                    :disabled="getDisabled"
                    @changed="onChangeCheckbox(getCheckboxes.wallet, $event)"
                />
            </div>

            <div class="settings-main-operations__checkbox">
                <p class="settings-main-operations__checkbox-label">
                    Wallet Withdrawal
                </p>

                <UICheckbox
                    :value="form.withdrawal"
                    :small="true"
                    :disabled="getDisabled"
                    @changed="
                        onChangeCheckbox(getCheckboxes.withdrawal, $event)
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
    name: "SettingsMainOperations",
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
.settings-main-operations {
    .settings-main-operations__title {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        margin-bottom: 6px;
    }

    .settings-main-operations__checkboxes {
        display: flex;
        flex-direction: column;
        grid-row-gap: 6px;
    }

    .settings-main-operations__checkbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 16px;
    }

    .settings-main-operations__checkbox-label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}
</style>
