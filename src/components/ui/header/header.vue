<template>
    <div class="ui-header">
        <UIHeaderWallet :balance="getBalance" />

        <UIHeaderProfile />
    </div>
</template>

<script>
import UIHeaderWallet from "@/components/ui/header/wallet.vue";
import UIHeaderProfile from "@/components/ui/header/profile.vue";

export default {
    name: "UIHeader",
    components: {
        UIHeaderWallet,
        UIHeaderProfile,
    },
    computed: {
        getBalance() {
            return this.$store.getters.getBalance;
        },
    }
};
</script>

<style lang="scss">
.ui-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 10px 10px 10px;
}
</style>
