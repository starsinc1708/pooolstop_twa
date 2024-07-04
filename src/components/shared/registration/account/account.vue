<template>
    <div class="registration-account">
        <UIInput
            placeholder="Account Name"
            :value="form.account"
            :full="true"
            :error="getAccountError"
            :message="message"
            @changed="onChangeAccount"
        />

        <UIAccountValidation
            class="settings-account-form__validation"
            :validation="getValidation"
        />

        <div class="registration-account__checkboxes">
            <div class="registration-account__checkbox">
                <UICheckbox :value="subscribe" @changed="onChangeSubscribe" />

                <p class="registration-account__checkbox-label">
                    Subscribe to PooolsTop Newsletter
                </p>
            </div>

            <div class="registration-account__checkbox">
                <UICheckbox :value="read" @changed="onChangeRead" />

                <p class="registration-account__checkbox-label">
                    I have read and agreed with

                    <button
                        class="registration-account__checkbox-terms"
                        @click="onTerms"
                    >
                        Terms of Service
                    </button>
                </p>
            </div>
        </div>

        <UIButton
            label="Next"
            view="main"
            :full="true"
            :disabled="getDisabled"
            :uppercase="true"
            @clicked="onCreate"
        />
    </div>
</template>

<script>
import UIInput from "@/components/ui/input/input.vue";
import UIAccountValidation from "@/components/ui/validation/account-validation.vue";
import UICheckbox from "@/components/ui/checkbox/checkbox.vue";
import UIButton from "@/components/ui/button/button.vue";

import {getValidationAccount, getValidationContainSpecialCharacters} from "@/utils/functions.js";
import {RESPONSE_STATUSES, ACCOUNT_VALIDATION_LABELS, PASSWORD_VALIDATION_ICONS} from "@/utils/constants.js";
import {MODALS} from "@/store/modal.js";
import {NOTIFICATIONS} from "@/store/notification.js";

import {COMPONENTS} from "@/components/shared/registration/content/content.vue";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "RegistrationAccount",
    components: {
        UIInput,
        UICheckbox,
        UIButton,
        UIAccountValidation,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            subscribe: false,
            read: false,
            loading: false,
            message: "",
            valid: false,
        };
    },
    computed: {
        getValidationAccount() {
            return getValidationAccount(this.form.account);
        },

        getAccountError() {
            if (this.message) {
                return true;
            }

            if (this.form.account && !this.getValidationAccount) {
                return !this.getValidationAccount;
            }

            return false;
        },

        getDisabled() {
            return (
                this.loading ||
                !this.read ||
                !this.getValidationAccount ||
                !this.valid
            );
        },

        getValidation() {
            return [
                {
                    id: 0,
                    label: ACCOUNT_VALIDATION_LABELS.beAtLeast4CharactersLong,
                    validation: !this.form.account.length
                        ? PASSWORD_VALIDATION_ICONS.default
                        : PASSWORD_VALIDATION_ICONS[
                            this.form.account.length >= 4
                        ],
                },
                {
                    id: 1,
                    label: ACCOUNT_VALIDATION_LABELS.onlyLowerCase,
                    validation:
                        !this.form.account.length
                            ? PASSWORD_VALIDATION_ICONS.default
                            : PASSWORD_VALIDATION_ICONS[this.form.account === this.form.account.toLowerCase()],
                },
                {
                    id: 2,
                    label: ACCOUNT_VALIDATION_LABELS.noContainSpecialCharacters,
                    validation: !this.form.account.length
                        ? PASSWORD_VALIDATION_ICONS.default
                        : PASSWORD_VALIDATION_ICONS[
                            !getValidationContainSpecialCharacters(this.form.account)
                        ],
                },
            ];
        }
    },
    methods: {
        async onChangeAccount(account) {
            try {
                this.$emit("account", account);

                this.message = "";

                this.loading = true;
                this.valid = false;

                await api
                    .accountValidate(this.form.account)
                    .then(({status, message}) => {
                        if (status === RESPONSE_STATUSES.error) {
                            this.message = message;

                            this.loading = false;
                            this.valid = false;
                        } else {
                            this.message = "";

                            this.loading = false;
                            this.valid = true;
                        }
                    });
            } catch (e) {
                this.loading = false;
            }
        },

        onChangeSubscribe(subscribe) {
            this.subscribe = subscribe;
        },

        onChangeRead(read) {
            this.read = read;
        },

        onTerms() {
            this.$store.commit("modal/setModal", MODALS.terms);
        },

        async onCreate() {
            try {
                this.loading = true;

                await api.registration(this.form).then(() => {
                    this.loading = false;

                    this.$store.commit(
                        "notification/setNotification",
                        NOTIFICATIONS.registration
                    );

                    this.$emit("next", COMPONENTS.verification);
                });
            } catch (e) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss">
.registration-account {
    .registration-account__checkboxes {
        display: flex;
        flex-direction: column;
        grid-row-gap: 12px;
        margin: 16px 0 18px 0;
    }

    .registration-account__checkbox {
        display: flex;
        align-items: center;
        grid-column-gap: 16px;
        margin-right: auto;
    }

    .registration-account__checkbox-label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        display: flex;
        grid-column-gap: 4px;
        white-space: nowrap;
    }

    .registration-account__checkbox-terms {
        @include button-reset;
        font-size: 14px;
        line-height: 17px;
        color: $main;
    }
}

.settings-account-form__validation {
    margin-top: 1px;
    margin-left: 10px;
}

@media screen and (max-width: 768px) {
    .registration-account {
        .registration-account__checkbox-label {
            white-space: normal;
            flex-wrap: wrap;
            grid-row-gap: 4px;
        }
    }
}
</style>
