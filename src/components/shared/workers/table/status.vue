<template>
    <div class="workers-table-status">
        <div
            class="workers-table-status__indicator"
            :class="getIndicatorViewClass"
        ></div>
    </div>
</template>

<script>
const INDICATOR_VIEWS = {
    green: "workers-table-status__indicator--green",
    yellow: "workers-table-status__indicator--yellow",
    red: "workers-table-status__indicator--red",
};

export default {
    name: "WorkersTableStatus",
    props: {
        worker: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getIndicatorViewClass() {
            return this.worker.active
                ? INDICATOR_VIEWS.green
                : INDICATOR_VIEWS.red;
        },
    },
};
</script>

<style lang="scss">
.workers-table-status {
    padding: 0 12px;

    .workers-table-status__indicator {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }

    .workers-table-status__indicator--green {
        background: $status-green;
    }

    .workers-table-status__indicator--yellow {
        background: $status-yellow;
    }

    .workers-table-status__indicator--red {
        background: $status-red;
    }
}

@media screen and (max-width: 768px) {
    .workers-table-status {
        padding: 0 8px;
    }
}
</style>
