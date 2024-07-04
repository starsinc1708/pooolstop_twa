<template>
    <div class="registration-email">
        <div class="registration-email__fields">
            <UIInput
                placeholder="Email Address*"
                :value="form.email"
                :full="true"
                :error="getEmailError"
                :message="message"
                @changed="onChangeEmail"
            />

            <UIInput
                placeholder="Referral ID"
                :value="form.referralId"
                :full="true"
                @changed="onChangeReferralId"
            />
        </div>

        <UIButton
            label="Next"
            view="main"
            :disabled="getDisabled"
            :uppercase="true"
            @clicked="onNext"
        />
    </div>
</template>

<script>
import UIInput from "@/components/ui/input/input.vue";
import UIButton from "@/components/ui/button/button.vue";

import {COMPONENTS} from "@/components/shared/registration/content/content.vue";

import {getValidationEmail} from "@/utils/functions";
import {RESPONSE_STATUSES} from "@/utils/constants";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "RegistrationEmail",
    components: {
        UIInput,
        UIButton,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            message: "",
        };
    },
    computed: {
        getValidationEmail() {
            return getValidationEmail(this.form.email);
        },

        getEmailError() {
            if (this.message) {
                return true;
            }

            if (this.form.email && !this.getValidationEmail) {
                return !this.getValidationEmail;
            }

            return false;
        },

        getDisabled() {
            return !this.getValidationEmail || this.loading;
        },
    },
    methods: {
        onChangeEmail(email) {
            this.$emit("email", email);
        },

        onChangeReferralId(referralId) {
            this.$emit("referralId", referralId);
        },

        async onNext() {
            try {
                this.loading = true;

                this.message = "";

                await api
                    .emailValidation(this.form.email)
                    .then(({status, message}) => {
                        if (status === RESPONSE_STATUSES.error) {
                            this.message = message;
                        } else {
                            this.$emit("next", COMPONENTS.password);
                        }

                        this.loading = false;
                    });
            } catch (e) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss">
.registration-email {
    display: flex;
    flex-direction: column;
    grid-row-gap: 16px;

    .registration-email__fields {
        display: flex;
        flex-direction: column;
        grid-row-gap: 8px;
    }
}
</style>
