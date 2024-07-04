<template>
    <UIModal class="wallet-confirm" padding="182" @close="onClose">
        <div class="wallet-confirm__content">
            <h2 class="wallet-confirm__title">Confirm Withdrawal</h2>

            <WalletConfirmResult
                class="wallet-confirm__result"
                :confirm="confirm"
            />

            <div class="wallet-confirm__code">
                <UIInputCode
                    v-if="!getDisabled"
                    label="Security Verification"
                    comment="Enter the 6 digit code from Email"
                    :full="true"
                    :fieldOne="form.fieldOne"
                    :fieldTwo="form.fieldTwo"
                    :fieldThree="form.fieldThree"
                    :fieldFour="form.fieldFour"
                    :fieldFive="form.fieldFive"
                    :fieldSix="form.fieldSix"
                    @field="onChangeField"
                />
                <UIButton
                    label="C O N F I R M"
                    view="main"
                    :full="true"
                    :disabled="!getCodeValidate || getDisabled"
                    @clicked="confirmWithdrawal"
                />
            </div>
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import WalletConfirmResult from "@/components/shared/wallet/confirm/result.vue";
import UIInputCode from "@/components/ui/input/code.vue";
import UIButton from "@/components/ui/button/button.vue";

import {COMPONENTS} from "@/components/shared/wallet/content/content.vue";

import Api from "@/api/api.js";

const api = new Api();

const DEFAULT_CODE_LENGTH = 6;

export default {
    name: "WalletConfirm",
    components: {
        UIModal,
        WalletConfirmResult,
        UIInputCode,
        UIButton
    },
    props: {
        confirm: {
            type: Object,
            required: true,
        },
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
            loading: false,
        };
    },
    computed: {
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

        getCodeValidate() {
            return this.getCode.length === DEFAULT_CODE_LENGTH;
        },

        getDisabled() {
            return this.loading;
        },
    },
    methods: {
        async onChangeField({key, value}) {
            this.form[key] = value;
        },

        onClose() {
            this.$emit("close", COMPONENTS.default);
        },

        async confirmWithdrawal() {
            this.loading = true
            try {
                const {id} = this.confirm;
                await api
                    .withdrawConfirm({id, code: this.getCode})
                    .then(async () => {
                        await api.balance().then(balance => {
                            this.$store.commit("setBalance", balance);
                        })
                        this.$emit("refresh");
                        this.onClose();
                    })
                    .finally(() => {
                        this.loading = false
                    });
            } catch (e) {
                this.loading = false;
            }
        }
    },
};
</script>

<style lang="scss">
.wallet-confirm {
    .wallet-confirm__content {
        width: 640px;
        padding: 48px 0 57px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wallet-confirm__title {
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }

    .wallet-confirm__result {
        margin: 44px 0 42px 0;
    }

    .wallet-confirm__code {
        padding: 0 150px;
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    .wallet-confirm {
        .wallet-confirm__title {
            font-size: 24px;
            line-height: 29px;
        }

        .wallet-confirm__content {
            width: 100%;
            padding: 32px 0 24px 0;
        }

        .wallet-confirm__result {
            margin: 18px 0 16px 0;
        }

        .wallet-confirm__code {
            width: 360px;
            padding: 0;
        }
    }
}
</style>
