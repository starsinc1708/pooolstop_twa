<template>
    <div class="workers-table">
        <WorkersTableHeader :sort="sort" @sort="onSort" />

        <WorkersTableBody
            :workers="getWorkers"
            @remove="onRemove"
            @workers="onWorkers"
            @closeMinerTagModal="closeMinerTagModal"
        />
    </div>
</template>

<script>
import WorkersTableHeader from "@/components/shared/workers/table/header.vue";
import WorkersTableBody from "@/components/shared/workers/table/body.vue";

import {SORT_VALUES} from "@/utils/constants.js";
import {getSort} from "@/utils/functions";

export default {
    name: "WorkersTable",
    components: {
        WorkersTableHeader,
        WorkersTableBody,
    },
    props: {
        workers: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            sort: {
                name: "",
                hashCurrent: "",
                hash1Hour: "",
                "stat24h.hashrate": "",
                "stat24h.rejectPercent": "",
                "stat24h.uptime": "",
            },
        };
    },
    computed: {
        getWorkers() {
            return getSort(this.sort, this.workers);
        },
    },
    methods: {
        onSort({key}) {
            switch (this.sort[key]) {
                case SORT_VALUES.default:
                    this.sort[key] = SORT_VALUES.asc;
                    break;
                case SORT_VALUES.asc:
                    this.sort[key] = SORT_VALUES.desc;
                    break;
                case SORT_VALUES.desc:
                    this.sort[key] = SORT_VALUES.default;
                    break;
                default:
                    break;
            }
        },

        onRemove(worker) {
            this.$emit("remove", worker);
        },

        onWorkers(workers) {
            this.$emit("workers", workers);
        },

        closeMinerTagModal() {
            this.$emit("closeMinerTagModal")
        }
    },
};
</script>
