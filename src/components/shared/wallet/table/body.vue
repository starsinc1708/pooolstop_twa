<template>
    <div class="wallet-table-body">
        <WalletTableRow v-for="row in transactions" :key="row.id" :row="row" />

        <UIShowMore
            class="wallet-table-body__show-more"
            v-if="getShowMoreIsShow"
            :disabled="getDisabled"
            @more="onChangePage"
        />
    </div>
</template>

<script>
import WalletTableRow from "@/components/shared/wallet/table/row.vue";
import UIShowMore from "@/components/ui/show-more/show-more.vue";

export default {
    name: "WalletTableBody",
    components: {
        WalletTableRow,
        UIShowMore,
    },
    props: {
        transactions: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getDisabled() {
            return this.loading;
        },

        getShowMoreIsShow() {
            return this.show && this.transactions.length;
        },
    },
    methods: {
        onChangePage() {
            this.$emit("page");
        },
    },
};
</script>

<style lang="scss">
.wallet-table-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    .wallet-table-body__show-more {
        margin-top: 32px;
    }
}

@media screen and (max-width: 768px) {
    .wallet-table-body {
        .wallet-table-body__show-more {
            margin-top: 24px;
        }
    }
}
</style>
