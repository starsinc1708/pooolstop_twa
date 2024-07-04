<template>
    <div class="ui-wallet">
        <div class="ui-wallet__header">
            <p class="ui-wallet__label">
                {{ label }}
            </p>

            <div class="ui-wallet__group">
                <!-- <UIButton icon="qr" view="light-small" @clicked="onQr" /> -->

                <UIButton
                    label="Copy"
                    view="light"
                    :disabled="getCopyDisabled"
                    @clicked="onCopy"
                />
            </div>
        </div>

        <div class="ui-wallet__field">
            <p class="ui-wallet__field-label">
                {{ value }}
            </p>
        </div>

        <p class="ui-wallet__message" v-if="message">
            {{ message }}
        </p>
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

const DEFAULT_SECONDS = 500;

export default {
    name: "UIWallet",
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
        message: {
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
        onQr() {
            console.log("QR");
        },

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
.ui-wallet {
    display: flex;
    flex-direction: column;

    .ui-wallet__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .ui-wallet__group {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .ui-wallet__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }

    .ui-wallet__field {
        padding: 12px 20px;
        background: $gray-100;
        border-radius: 10px;
        min-height: 45px;
    }

    .ui-wallet__field-label {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: $txt-main;
        max-width: 330px;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
    }

    .ui-wallet__message {
        font-size: 12px;
        line-height: 16px;
        color: $txt-main;
        margin-top: 8px;
    }
}

@media screen and (max-width: 768px) {
    .ui-wallet {
        .ui-wallet__field-label {
            font-size: 12px;
        }
    }
}
</style>
