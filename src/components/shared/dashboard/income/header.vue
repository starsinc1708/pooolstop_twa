<template>
    <div class="dashboard-income-header">
        <h2 class="dashboard-income-header__title">Income</h2>

        <div class="dashboard-income-header__group">
            <div class="dashboard-income-header__total">
                <p class="dashboard-income-header__total-label">Total</p>

                <h4 class="dashboard-income-header__total-title">
                    {{ total }}

                    <span class="dashboard-income-header__total-currency">
                        BTC
                    </span>
                </h4>
            </div>

            <UIDatePicker
                placeholder="Select Period"
                :value="period"
                :disabled="false"
                @changed="onChangePeriod"
            />

            <UIDownload
                class="dashboard-income-header__download"
                :disabled="false"
                @onDownload="onDownload"
            />
        </div>
    </div>
</template>

<script>
import UIDatePicker from "@/components/ui/date-picker/date-picker.vue";
import UIDownload from "@/components/ui/download/download.vue";
import Api from "@/api/api";

const api = new Api();

export default {
    name: "DashboardIncomeHeader",
    components: {
        UIDatePicker,
        UIDownload,
    },
    props: {
        total: {
            type: String,
            required: true,
        },
        period: {
            type: Array,
            default: () => [],
        },
        tags: {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        tagIds () {
            return this.tags.filter(t => t.show).map(t => t.id)
        }
    },
    methods: {
        onChangePeriod(period) {
            this.$emit("period", period);
        },

        async onDownload() {
            let param = {}
            let name = 'poools.top income'
            if (this.period && this.period.length == 2) {
                param = {
                    start: this.period[0],
                    end: this.period[1]
                }
                name += ' ' + this.period[0] + '-' + this.period[1]
            }
            if (this.tagIds) {
                param.tagIds = this.tagIds
            }
            const blob = await api.download(param)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = name + '.xlsx'
            document.body.appendChild(a)
            a.click()
            a.remove()
        }
    },
};
</script>

<style lang="scss">
.dashboard-income-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 10px 0 20px;
    width: 100%;

    .dashboard-income-header__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
    }

    .dashboard-income-header__group {
        display: flex;
        align-items: center;
    }

    .dashboard-income-header__total {
        margin-right: 32px;
    }

    .dashboard-income-header__total-label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
    }

    .dashboard-income-header__total-title {
        @include golos-medium;
        font-size: 20px;
        line-height: 24px;
        color: $txt-main;
    }

    .dashboard-income-header__total-currency {
        color: $txt-light;
    }

    .dashboard-income-header__download {
        margin-left: 24px;
    }
}

@media screen and (max-width: 1024px) {
    .dashboard-income-header {
        .dashboard-income-header__download {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .dashboard-income-header {
        padding: 14px 16px 0 16px;

        .dashboard-income-header__title {
            font-size: 24px;
            line-height: 29px;
        }

        .dashboard-income-header__total {
            margin-right: 24px;
        }

        .dashboard-income-header__total-label {
            font-size: 12px;
            line-height: 14px;
        }

        .dashboard-income-header__total-title {
            font-size: 16px;
            line-height: 19px;
        }
    }
}
</style>
