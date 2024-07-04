<template>
    <div class="workers-table-body">
        <WorkersTableRowTotal
            class="workers-table-body__row-total"
            :workers="workers"
        />

        <WorkersTableRow
            class="workers-table-body__row"
            v-for="(worker, workerIndex) in workers"
            :key="worker.id"
            :worker="worker"
            :workerIndex="workerIndex"
            @remove="onRemove"
            @workers="onWorkers"
            @closeMinerTagModal="closeMinerTagModal"
        />
    </div>
</template>

<script>
import WorkersTableRowTotal from "@/components/shared/workers/table/row-total.vue";
import WorkersTableRow from "@/components/shared/workers/table/row.vue";

export default {
    name: "WorkersTableBody",
    components: {
        WorkersTableRowTotal,
        WorkersTableRow,
    },
    props: {
        workers: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
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

<style lang="scss">
@media screen and (max-width: 768px) {
    .workers-table-body {
        .workers-table-body__row {
            &:nth-child(3n) {
                background: $bg-gray-light;
            }
        }

        .workers-table-body__row-total {
            display: none;
        }
    }
}
</style>
