<template>
    <div class="wallet-deposit-field">
        <div class="wallet-deposit-field__header">
            <p class="wallet-deposit-field__header-label">{{ label }}</p>

            <UIButton
                label="Copy"
                view="light"
                :disabled="getCopyDisabled"
                @clicked="onCopy"
            />
        </div>

        <div class="wallet-deposit-field__field">
            <p class="wallet-deposit-field__field-label">
                {{ value }}
            </p>
        </div>
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

const DEFAULT_SECONDS = 500;

export default {
    name: "WalletDepositTag",
    components: {
        UIButton,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        getCopyDisabled() {
            return this.loading;
        },
    },
    methods: {
        async onCopy() {
            try {
                this.loading = true;

                await navigator.clipboard.writeText(this.value).then(() => {
                    setTimeout(() => {
                        this.loading = false;
                    }, DEFAULT_SECONDS);
                });
            } catch (e) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss">
.wallet-deposit-field {
    .wallet-deposit-field__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .wallet-deposit-field__header-label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }

    .wallet-deposit-field__field {
        padding: 12px 20px;
        background: $gray-100;
        border-radius: 10px;
        min-height: 45px;
    }

    .wallet-deposit-field__field-label {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: $txt-main;
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
