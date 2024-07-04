<template>
    <div class="wallet-header-card">
        <div class="wallet-header-card__group">
            <img
                class="wallet-header-card__icon"
                src="@/assets/images/shared/wallet/header/clock.svg"
                alt="clock"
            />

            <div class="wallet-header-card__currency">
                <p class="wallet-header-card__currency-label">Expected, BTC</p>

                <h4 class="wallet-header-card__currency-title">
                    {{ wallet.expected_total }}
                </h4>
            </div>
        </div>

        <div class="wallet-header-card__info">
            <p class="wallet-header-card__info-label">
                Income: {{ wallet.expected_income }}
            </p>

            <p class="wallet-header-card__info-label">
                Bonus: {{ wallet.expected_bonus }}
            </p>
        </div>
    </div>
</template>

<script>
import {getFixedBtcValue} from "@/utils/functions.js";

export default {
    name: "WalletHeaderCard",
    props: {
        wallet: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getCurrencyTitle() {
            const {expected_total} = this.wallet;

            return getFixedBtcValue(expected_total);
        },
    },
};
</script>

<style lang="scss">
.wallet-header-card {
    background: $bg-gray-light;
    border-radius: 10px;
    padding: 8px 8px 8px 20px;
    display: flex;
    align-items: center;
    grid-column-gap: 40px;

    .wallet-header-card__group {
        display: flex;
        align-items: center;
        grid-column-gap: 14px;
    }

    .wallet-header-card__currency {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row-gap: 2px;
    }

    .wallet-header-card__currency-label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
    }

    .wallet-header-card__currency-title {
        @include golos-medium;
        font-size: 18px;
        line-height: 22px;
        color: $txt-main;
    }

    .wallet-header-card__info {
        padding: 8px 22px 8px 14px;
        border: 1px dashed $bg-gray;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 4px;
    }

    .wallet-header-card__info-label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }
}

@media screen and (max-width: 768px) {
    .wallet-header-card {
        padding: 6px 6px 6px 20px;
        width: 100%;
        justify-content: space-between;

        .wallet-header-card__currency {
            grid-row-gap: 4px;
        }

        .wallet-header-card__currency-label {
            font-size: 12px;
            line-height: 14px;
        }

        .wallet-header-card__currency-title {
            font-size: 14px;
            line-height: 17px;
        }

        .wallet-header-card__info {
            padding: 6px 22px 6px 16px;
        }

        .wallet-header-card__info-label {
            font-size: 10px;
            line-height: 12px;
        }
    }
}
</style>
