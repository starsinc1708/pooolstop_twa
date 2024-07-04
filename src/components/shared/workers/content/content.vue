<template>
    <div class="workers-content">
        <UIPageHeader title="Workers" :device="true" />

        <div class="workers-content__body">
            <WorkersHeader :tab="tab" :workers="workers" @tab="onChangeTab" />
            <WorkersTag :tags="tags" @openTagModal="openTagModal" :addButton="true" :label="''"/>

            <WorkersTable
                :workers="getWorkers"
                @remove="onRemoveWorker"
                @workers="onWorkers"
                @closeMinerTagModal="closeMinerTagModal"
            />
        </div>

        <transition name="modal">
            <WorkersModal
                class="workers-content__modal"
                v-if="getModalIsShow"
                :worker="worker"
                @close="onClearWorker"
                @workers="onWorkers"
            />
        </transition>
        <transition name="modal">
            <TagModal
                class="workers-content__modal"
                :tags="tags"
                v-if="showTagModal"
                @closeTagModal="closeTagModal"
            />
        </transition>
    </div>
</template>

<script>
import UIPageHeader from "@/components/ui/page-header/page-header.vue";
import WorkersHeader from "@/components/shared/workers/header/header.vue";
import WorkersTag from "@/components/shared/workers/header/tags.vue";
import WorkersTable from "@/components/shared/workers/table/table.vue";
import WorkersModal from "@/components/shared/workers/modal/modal.vue";
import TagModal from "@/components/shared/tag/modal/modal.vue";

import {TABS} from "@/components/shared/workers/header/tabs.vue";

export default {
    name: "WorkersContent",
    components: {
        UIPageHeader,
        WorkersHeader,
        WorkersTag,
        WorkersTable,
        WorkersModal,
        TagModal
    },
    props: {
        workers: {
            type: Array,
            default: () => [],
        },
        tags: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            tab: TABS.all,
            worker: null,
            showTagModal: false
        };
    },
    computed: {
        getWorkers() {
            const showTags = this.tags.filter(t => t.show)
            let filterWorkers = [...this.workers]
            for (let tag of showTags) {
                filterWorkers = filterWorkers.filter(w => w.tags.find(t => t.id === tag.id))
            }

            switch (this.tab) {
                case TABS.all:
                    return filterWorkers;
                case TABS.active:
                    return filterWorkers.filter((worker) => worker.active);
                case TABS.inactive:
                    return filterWorkers.filter((worker) => !worker.active);
                default:
                    return filterWorkers;
            }
        },

        getModalIsShow() {
            return this.worker;
        },
    },
    methods: {
        onChangeTab({value}) {
            this.tab = value;
        },

        onRemoveWorker(worker) {
            this.worker = worker;
        },

        onClearWorker() {
            this.worker = null;
        },

        onWorkers(workers) {
            this.$emit("workers", workers);
        },

        openTagModal() {
            this.showTagModal = true
        },

        closeTagModal(forceRefreshTag, forceRefreshMiners) {
            this.showTagModal = false
            if (forceRefreshTag) {
                this.$emit("getTags")
            }
            if (forceRefreshMiners) {
                this.$emit("getWorkers")
            }
        },

        closeMinerTagModal() {
            this.$emit("getWorkers")
        }
    },
};
</script>

<style lang="scss">
.workers-content {
    display: flex;
    flex-direction: column;
    grid-row-gap: 16px;

    .workers-content__body {
        background: $white;
        border-radius: 16px;
        padding: 28px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 34px;
    }

    .workers-content__modal {
        @include modal;
    }
}

@media screen and (max-width: 768px) {
    .workers-content {
        grid-row-gap: 18px;

        .workers-content__body {
            padding: 0 0 20px 0;
            grid-row-gap: 14px;
        }
    }
}
</style>
