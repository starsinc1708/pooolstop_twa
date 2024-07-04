<template>
    <div class="settings-other-amount-field">
        <UIAmount
            class="settings-other-amount-field__amount"
            label="Minimum Value"
            placeholder="Enter amount"
            :currency="amount.currency"
            :disabled="disabled"
            :full="true"
            :value="amount.value"
            @changed="onChangeAmount"
        />

        <UIButton
            class="settings-other-amount-field__save"
            label="Save"
            view="main-outline"
            size="small"
            :disabled="disabled"
            @click="onSave"
        />
    </div>
</template>

<script>
import UIAmount from "@/components/ui/amount/amount.vue";
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "SettingsOtherAmountField",
    components: {
        UIAmount,
        UIButton,
    },
    props: {
        amount: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onChangeAmount(amount) {
            this.$emit("amount", {
                key: this.amount.key,
                value: amount,
            });
        },

        onSave() {
            console.log("SAVE");
        },
    },
};
</script>

<style lang="scss">
.settings-other-amount-field {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;

    .settings-other-amount-field__amount {
        max-width: 340px;
    }

    .settings-other-amount-field__save {
        margin-bottom: 3px;
    }
}

@media screen and (max-width: 768px) {
    .settings-other-amount-field {
        .settings-other-amount-field__amount {
            max-width: 230px;
        }
    }
}
</style>
