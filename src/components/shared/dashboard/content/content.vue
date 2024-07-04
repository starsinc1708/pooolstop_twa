<template>
  <div class="dashboard-content">
    <UIPageHeader title="Statistics" :device="true"/>
    <div class="dashboard-content__body">
      <WorkersTag :tags="tags" @selectTag="selectTag"/>

      <DashboardHashrate
          :dashboard="dashboard"
          :nominal="nominal"
          :tab="tab"
          @tab="onChangeTab"
      />

      <DashboardIncome
          :incomes="incomes"
          :total="total"
          :loading="loading"
          :show="show"
          :period="period"
          :tags="tags"
          @period="onChangePeriod"
          @page="onChangePage"
      />
    </div>
  </div>
</template>

<script>
import UIPageHeader from "@/components/ui/page-header/page-header.vue";
import DashboardHashrate from "@/components/shared/dashboard/hashrate/hashrate.vue";
import DashboardIncome from "@/components/shared/dashboard/income/income.vue";
import WorkersTag from "@/components/shared/workers/header/tags.vue";

export default {
  name: "DashboardContent",
  components: {
    UIPageHeader,
    DashboardHashrate,
    DashboardIncome,
    WorkersTag
  },
  props: {
    dashboard: {
      type: Object,
      required: true,
    },
    incomes: {
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
    nominal: {
      type: Object,
      required: true,
    },
    tab: {
      type: Number,
      required: true,
    },
    period: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChangePage() {
      this.$emit("page");
    },

    onChangeTab(tab) {
      this.$emit("tab", tab);
    },

    onChangePeriod(period) {
      this.$emit("period", period);
    },

    selectTag() {
      this.$emit("selectTag")
    }
  },
};
</script>

<style lang="scss">
.dashboard-content {
  display: flex;
  flex-direction: column;
  grid-row-gap: 16px;

  .dashboard-content__body {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 20px 28px 20px;
    display: flex;
    flex-direction: column;
    grid-row-gap: 20px;
  }
}

@media screen and (max-width: 768px) {
  .dashboard-content {
    grid-row-gap: 14px;
    .dashboard-content__body {
      padding: 0 0 20px 0;
      grid-row-gap: 24px;
    }
  }
}
</style>
