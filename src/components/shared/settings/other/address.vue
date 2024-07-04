<template>
    <div class="settings-other-address">
        <UIInput
            class="settings-other-address__field"
            label="BTC Payment Address"
            placeholder="Enter BTC wallet address"
            :full="true"
            :value="walletAddress"
            :disabled="getDisabled"
            @changed="onChangeWalletAddress"
        />

        <UIButton
            class="settings-other-address__save"
            label="Save"
            view="main-outline"
            size="small"
            :disabled="getDisabled"
            @clicked="onSave"
        />
    </div>
</template>

<script>
import UIInput from "@/components/ui/input/input.vue";
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "SettingsOtherAddress",
    components: {
        UIInput,
        UIButton,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            walletAddress: "",
        };
    },
    computed: {
        getDisabled() {
            return this.loading;
        },
    },
    methods: {
        onChangeWalletAddress(walletAddress) {
            this.walletAddress = walletAddress;
        },

        onSave() {
            this.$emit("save");
        },
    },
};
</script>

<style lang="scss">
.settings-other-address {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid $gray;

    .settings-other-address__field {
        max-width: 340px;
    }

    .settings-other-address__save {
        margin-bottom: 3px;
    }
}

@media screen and (max-width: 768px) {
    .settings-other-address {
        .settings-other-address__field {
            max-width: 230px;
        }
    }
}
</style>
