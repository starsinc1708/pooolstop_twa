<template>
    <div class="dashboard-hashrate-workers">
        <div class="dashboard-hashrate-worker_group">
          <p class="dashboard-hashrate-workers__label">Workers:</p>

          <div class="dashboard-hashrate-workers__list">
            <div
                class="dashboard-hashrate-workers__item"
                v-for="worker in getWorkers"
                :key="worker.id"
            >
              <img
                  class="dashboard-hashrate-workers__item-icon"
                  :src="worker.icon"
                  alt="icon"
              />

              <p class="dashboard-hashrate-workers__item-label">
                {{ worker.value }}
              </p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashboardHashrateWorkers",
    props: {
        dashboard: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getWorkers() {
            const {active, warning, dead} = this.dashboard.minersInfo;

            return [
                {
                    id: 0,
                    icon: require("@/assets/images/shared/dashboard/hashrate/success.svg"),
                    value: active,
                },
                {
                    id: 1,
                    icon: require("@/assets/images/shared/dashboard/hashrate/warning.svg"),
                    value: warning,
                },
                {
                    id: 2,
                    icon: require("@/assets/images/shared/dashboard/hashrate/error.svg"),
                    value: dead,
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.dashboard-hashrate-workers {
    cursor: pointer;
    background: $bg-gray-light;
    border-radius: 10px;
    display: flex;
    align-items: center;
    grid-column-gap: 24px;

    .dashboard-hashrate-workers__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-light;
    }

    .dashboard-hashrate-workers__list {
        display: flex;
        align-items: center;
        grid-column-gap: 24px;
    }

    .dashboard-hashrate-workers__item {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .dashboard-hashrate-workers__item-icon {
        display: block;
    }

    .dashboard-hashrate-workers__item-label {
        @include golos-medium;
        font-size: 20px;
        line-height: 24px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .dashboard-hashrate-workers {
        width: 100%;
        justify-content: center;
        padding: 8px 42px;

        .dashboard-hashrate-workers__item-icon {
            width: 20px;
        }

        .dashboard-hashrate-workers__item-label {
            font-size: 16px;
            line-height: 19px;
        }
    }
}
</style>
