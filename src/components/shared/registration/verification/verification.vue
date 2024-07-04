<template>
    <div class="registration-verification">
        <UIInputCode
            label="Email Verification"
            comment="Enter the 6 digit code from Email"
            :error="error"
            :fieldOne="code.fieldOne"
            :fieldTwo="code.fieldTwo"
            :fieldThree="code.fieldThree"
            :fieldFour="code.fieldFour"
            :fieldFive="code.fieldFive"
            :fieldSix="code.fieldSix"
            @field="onChangeField"
        />

        <UIButton
            label="Create Account"
            view="main"
            :full="true"
            :disabled="getDisabled"
            @clicked="onCreate"
        />
    </div>
</template>

<script>
import UIInputCode from "@/components/ui/input/code.vue";
import UIButton from "@/components/ui/button/button.vue";

import Api from "@/api/api";

import {RESPONSE_STATUSES} from "@/utils/constants.js";
import {setCookie} from "@/utils/functions.js";

const api = new Api();

const CODE_LENGTH = 6;

export default {
    name: "RegistrationVerification",
    components: {
        UIInputCode,
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
            code: {
                fieldOne: "",
                fieldTwo: "",
                fieldThree: "",
                fieldFour: "",
                fieldFive: "",
                fieldSix: "",
            },
            loading: false,
            error: false,
        };
    },
    computed: {
        getCode() {
            return Object.values(this.code).join("");
        },

        getCodeIsValid() {
            return this.getCode.length === CODE_LENGTH;
        },

        getDisabled() {
            return this.loading || !this.getCodeIsValid;
        },
    },
    methods: {
        onChangeField({key, value}) {
            this.code[key] = value;
        },

        async onCreate() {
            try {
                this.loading = true;
                this.error = false;

                const email = this.form.email;

                await api
                    .verifyByCode({
                        email,
                        code: this.getCode,
                    })
                    .then(({status}) => {
                        if (status === RESPONSE_STATUSES.success) {
                            setCookie("introduction", email, "365d");

                            this.$router.push("/login");
                        } else if (status === RESPONSE_STATUSES.error) {
                            this.error = true;
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
.registration-verification {
    display: flex;
    flex-direction: column;
    grid-row-gap: 56px;
}
</style>
