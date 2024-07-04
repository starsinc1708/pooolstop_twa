<template>
    <div class="restore-password-email">
        <div class="restore-password-email__fields">
            <UIInput
                placeholder="Email*"
                :value="form.email"
                :full="true"
                :error="getEmailError"
                :message="message"
                @changed="onChangeEmail"
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

import {COMPONENTS} from "@/components/shared/restore-pasword/content/content.vue";

import {getValidationEmail} from "@/utils/functions";

import Api from "@/api/api";
import {RESPONSE_STATUSES} from "@/utils/constants";

const api = new Api();

export default {
    name: "RestorePasswordEmail",
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
            message: "",
            loading: false,
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

        async onNext() {
            try {
                this.loading = true;

                this.message = "";

                await api
                    .resetPassword(this.form.email)
                    .then(({status, message}) => {
                        if (status === RESPONSE_STATUSES.error) {
                            this.message = message;
                        } else if (status === RESPONSE_STATUSES.success) {
                            this.$emit("next", COMPONENTS.code);
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
.restore-password-email {
    display: flex;
    flex-direction: column;
    grid-row-gap: 16px;
}
</style>
