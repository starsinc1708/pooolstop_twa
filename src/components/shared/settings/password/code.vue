<template>
    <div class="settings-password-code">
        <UIInputCode
            label="Security Verification"
            comment="Enter the 6 digit code from 2FA"
            :fieldOne="form.fieldOne"
            :fieldTwo="form.fieldTwo"
            :fieldThree="form.fieldThree"
            :fieldFour="form.fieldFour"
            :fieldFive="form.fieldFive"
            :fieldSix="form.fieldSix"
            @field="onChangeField"
        />

        <UIButton label="Change Password" view="main" @clicked="onChange" />
    </div>
</template>

<script>
import UIInputCode from "@/components/ui/input/code.vue";
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "SettingsPasswordCode",
    components: {
        UIInputCode,
        UIButton,
    },
    data() {
        return {
            form: {
                fieldOne: "",
                fieldTwo: "",
                fieldThree: "",
                fieldFour: "",
                fieldFive: "",
                fieldSix: "",
            },
        };
    },
    methods: {
        onChangeField({key, value}) {
            this.form[key] = value;
        },

        onChange() {
            console.log("CHANGE");
        },
    },
};
</script>

<style lang="scss">
.settings-password-code {
    display: flex;
    flex-direction: column;
    grid-row-gap: 128px;
    padding-top: 65px;
}
</style>
