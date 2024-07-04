<template>
    <div class="restore-password-code">
        <UIInputCode
            label="Security Verification"
            comment="Enter the 6 digit code from 2FA"
            :full="true"
            :fieldOne="form.fieldOne"
            :fieldTwo="form.fieldTwo"
            :fieldThree="form.fieldThree"
            :fieldFour="form.fieldFour"
            :fieldFive="form.fieldFive"
            :fieldSix="form.fieldSix"
            @field="onChangeField"
        />

        <img
            class="restore-password-code__status"
            v-show="getStatusIsShow"
            :src="getStatus"
            alt="status"
        />
    </div>
</template>

<script>
import UIInputCode from "@/components/ui/input/code.vue";

import {COMPONENTS} from "@/components/shared/restore-pasword/content/content.vue";

const STATUS_IMAGES = {
    error: require("@/assets/images/shared/restore-password/code/error.svg"),
    success: require("@/assets/images/shared/restore-password/code/success.svg"),
    default: "",
};

const CODE_LENGTH = 6;

export default {
    name: "RestorePasswordCode",
    components: {
        UIInputCode,
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            status: "",
        };
    },
    computed: {
        getStatus() {
            return STATUS_IMAGES[this.status];
        },

        getStatusIsShow() {
            return this.status;
        },

        getCode() {
            const {
                fieldOne,
                fieldTwo,
                fieldThree,
                fieldFour,
                fieldFive,
                fieldSix,
            } = this.form;

            return `${fieldOne}${fieldTwo}${fieldThree}${fieldFour}${fieldFive}${fieldSix}`;
        },

        getCodeIsCompleted() {
            return this.getCode.length === CODE_LENGTH;
        },
    },
    methods: {
        async onChangeField(field) {
            this.$emit("code", field);

            if (this.getCodeIsCompleted) {
                this.$emit("next", COMPONENTS.password);
            }
        },
    },
};
</script>

<style lang="scss">
.restore-password-code {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row-gap: 72px;
}
</style>
