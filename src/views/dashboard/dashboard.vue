<template>
    <div class="dashboard">
        <DashboardContent
            :dashboard="dashboard"
            :incomes="incomes"
            :total="total"
            :loading="loading"
            :show="show"
            :nominal="nominal"
            :tab="tab"
            :period="period"
            @period="onChangePeriod"
            @page="onChangePage"
            @tab="onChangeTab"
            :tags="tags"
            @selectTag="selectTag"
        />
    </div>
</template>

<script>
import DashboardContent from "@/components/shared/dashboard/content/content.vue";

import {dashboardFactory, nominalFactory} from "@/utils/factory.js";
import {
    DEFAULT_PAGE,
    DEFAULT_PAGE_STEP,
    RESPONSE_STATUSES,
} from "@/utils/constants.js";
import {
    getIsShow,
    getSubtractTimeFromCurrentDate,
    getDashboardFactory,
} from "@/utils/functions.js";

import {TAB_VALUES} from "@/components/shared/dashboard/hashrate/header.vue";

import Api from "@/api/api";

const api = new Api();

const START = {
    0: {
        hours: 1,
        days: 0,
    },
    1: {
        hours: 4,
        days: 0,
    },
    2: {
        hours: 0,
        days: 1,
    },
    3: {
        hours: 0,
        days: 31,
    }
};

export default {
    name: "Dashboard",
    components: {
        DashboardContent,
    },
    data() {
        return {
            dashboard: dashboardFactory(),
            incomes: [],
            total: 0,
            nominal: nominalFactory(),
            page: DEFAULT_PAGE,
            loading: false,
            show: true,
            tab: TAB_VALUES.step1hour,
            period: [],
            tags: []
        };
    },
    created() {
        this.onFetchData(true);
    },
    computed: {
        getDashboard() {
            return this.tab === TAB_VALUES.step1month
                ? getDashboardFactory(this.dashboard, this.incomes)
                : this.dashboard;
        },
        tagIds () {
            return this.tags.filter(t => t.show).map(t => t.id)
        }
    },
    methods: {
        async onChangeTab(tab) {
            try {
                this.loading = true;

                this.tab = tab;


                await api
                    .dashboard({
                        start: getSubtractTimeFromCurrentDate(START[tab]),
                        step: tab == 3 ? 4 : tab,
                    })
                    .then((dashboard) => {
                        this.dashboard = dashboard;

                        this.loading = false;
                    });
            } catch (e) {
                this.loading = false;
            }
        },

        async onChangePage() {
            try {
                this.loading = true;

                this.page += DEFAULT_PAGE_STEP;

                await api.incomes(this.page, this.period, this.tagIds).then((response) => {
                    this.incomes.push(...response.incomes);
                    this.total = response.total
                    this.show = getIsShow(incomes);

                    this.loading = false;
                });
            } catch (e) {
                this.loading = false;
            }
        },

        async onFetchData(loadTags) {
            try {
                this.loading = true;
                let promises = []
                let dashboardParams = {
                    start: getSubtractTimeFromCurrentDate(START[this.tab]),
                    step: this.tab
                }
                if (this.tagIds.length > 0) dashboardParams['tagIds'] = this.tagIds
                promises.push(api.dashboard(dashboardParams))
                promises.push(api.incomes(this.page, this.period, this.tagIds))
                if (loadTags) promises.push(api.tags())
                await Promise.all(promises).then(async (responses) => {
                    this.dashboard = responses[0];
                    this.incomes = responses[1].incomes;
                    this.total = responses[1].total
                    if (responses[2]) {
                        this.tags = responses[2]
                        this.tags.forEach( t => t.show = false)
                    }
                    this.show = getIsShow(this.incomes);

                    await api.getNominal(this.tagIds).then(({status, data}) => {
                        if (status === RESPONSE_STATUSES.success) {
                            this.nominal = data;
                        }
                    }).finally(() => {
                        this.loading = false;
                    })
                });
            } catch (e) {
                this.loading = false;
            }
        },

        async onChangePeriod(period) {
            this.period = period
            await api.incomes(this.page, this.period, this.tagIds).then((incomes) => {
                this.incomes = incomes.incomes;
                this.total = incomes.total
                this.show = getIsShow(incomes.incomes);
            })
        },

        async getTags() {
            await api.tags().then((tags) => {
                this.tags = tags
                this.tags.forEach( t => t.show = false)
            })
        },

        selectTag() {
            this.onFetchData(false)
        }
    },
};
</script>
