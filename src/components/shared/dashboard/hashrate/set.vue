<template>
    <router-link class="dashboard-hashrate-set" to="/workers">
        <span class="dashboard-hashrate-set__label"> Set </span>

        <span class="dashboard-hashrate-set__label"> Hashrate </span>
    </router-link>
</template>

<script>
export default {
    name: "DashboardHashrateSet",
};
</script>

<style lang="scss">
.dashboard-hashrate-set {
    @include golos-regular;
    font-size: 12px;
    line-height: 12px;
    text-align: right;
    color: $main;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
}

@media screen and (max-width: 768px) {
    .dashboard-hashrate-set {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        grid-column-gap: 4px;
    }
}
</style>
