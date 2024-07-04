<template>
    <div class="wallet">
        <WalletContent v-if="!loading"
            :wallet="wallet"
            :transactions="transactions"
            :loading="loading"
            :show="show"
            :detailed="detailed"
            @wallet="onWallet"
            @refresh="refresh"
            @page="onChangePage"
            @detailed="onChangeDetailed"
        />
    </div>
</template>

<script>
import WalletContent from "@/components/shared/wallet/content/content.vue";

import {walletFactory} from "@/utils/factory";
import {DEFAULT_PAGE, DEFAULT_PAGE_STEP} from "@/utils/constants.js";
import {getIsShow} from "@/utils/functions.js";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "Wallet",
    components: {
        WalletContent,
    },
    data() {
        return {
            wallet: walletFactory(),
            compressTransactions: [],
            detailedTransaction: [],
            detailed: false,
            page: DEFAULT_PAGE + DEFAULT_PAGE_STEP,
            loading: false,
            show: true,
        };
    },
    computed: {
        transactions () {
            if (this.detailed) return this.detailedTransaction
            else return this.compressTransactions
        }
    },
    created() {
        this.onFetchData();
    },
    methods: {
        onWallet(wallet) {
            this.wallet = wallet;
        },

        async onChangePage() {
            try {
                this.loading = true;

                this.page += DEFAULT_PAGE_STEP;

                await api.transactions(this.page).then((transactions) => {
                    this.detailedTransaction.push(...transactions);
                    this.compressTransactions = this.getCompressTransactions(this.detailedTransaction)
                    this.show = getIsShow(transactions);
                    this.loading = false;
                });
            } catch (e) {
                this.loading = false;
            }
        },

        async onFetchData() {
            try {
                this.loading = true;

                await Promise.all([
                    api.wallet(),
                    api.transactions(this.page),
                ]).then(async ([wallet, transactions]) => {
                    this.wallet = wallet;
                    this.detailedTransaction = transactions;
                    this.compressTransactions = this.getCompressTransactions(this.detailedTransaction)
                    this.show = getIsShow(transactions);
                    this.loading = false;
                    this.$forceUpdate()
                });
            } catch (e) {
                this.loading = false;
            }
        },

        refresh() {
            location.reload() //todo bad solution
        },

        onChangeDetailed() {
            this.detailed = !this.detailed
        },

        getCompressTransactions(transactions) {
            let arr = [...transactions]
            if (arr.length < 2) return arr
            for (let curr = 0, next = 1; next < arr.length; ) {
                if (arr[curr]['timestamp'] == arr[next]['timestamp'] && 
                    arr[curr]['status'] == arr[next]['status'] && 
                    arr[curr]['type'] == arr[next]['type']
                ) {
                    arr[curr]['amount'] = parseFloat(arr[curr]['amount']) + parseFloat(arr[next]['amount'])
                    arr[curr]['amount'] = arr[curr]['amount'].toFixed(8)
                    arr.splice(next, 1)
                } else {
                    curr++;
                    next++;
                }
            }
            return arr
        }
    },
};
</script>
