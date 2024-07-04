<template>
    <div class="workers-table-toolbar">
        <button
            class="workers-table-toolbar__button workers-table-toolbar__button--tag"
            @click="openMinaerTagModal"
        >
            <img
                src="@/assets/images/shared/workers/table/hashtag.svg"
                alt="tag"
            />
        </button>

        <button
            class="workers-table-toolbar__button workers-table-toolbar__button--remove"
            v-if="getRemoveIsShow"
            @click="onRemove"
        >
            <img
                src="@/assets/images/shared/workers/table/trash.svg"
                alt="trash"
            />
        </button>

        <div class="workers-table-toolbar__group">
            <UISvg
                class="workers-table-toolbar__icon"
                :class="getIconViewClass"
                icon="chart"
            />

            <button class="workers-table-toolbar__button" @click="onToggle">
                <UISvg
                    class="workers-table-toolbar__button-icon"
                    :class="getButtonIconViewClass"
                    icon="chevronDown"
                />
            </button>
        </div>

        <transition name="modal">
            <WorkerTagModal
                class="workers-content__modal"
                v-if="showMinerTagModal"
                :tags="worker.tags"
                :worker="worker"
                @closeMinerTagModal="closeMinerTagModal"
            />
        </transition>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import WorkerTagModal from "@/components/shared/tag/modal/workerModal.vue";

const ICON_VIEWS = {
    default: "",
    active: "workers-table-toolbar__icon--active",
};

const BUTTON_ICON_VIEWS = {
    default: "",
    active: "workers-table-toolbar__button-icon--active",
};

export default {
    name: "WorkersTableToolbar",
    components: {
        UISvg,
        WorkerTagModal
    },
    props: {
        toggle: {
            type: Boolean,
            default: false,
        },
        worker: {
            type: Object,
            required: true,
        },
        allTags: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            showMinerTagModal: false
        }
    },
    computed: {
        getRemoveIsShow() {
            return !this.worker.active;
        },

        getIconViewClass() {
            return this.toggle ? ICON_VIEWS.active : ICON_VIEWS.default;
        },

        getButtonIconViewClass() {
            return this.toggle
                ? BUTTON_ICON_VIEWS.active
                : BUTTON_ICON_VIEWS.default;
        },
    },
    methods: {
        onRemove() {
            this.$emit("remove");
        },

        onToggle() {
            this.$emit("toggle");
        },

        openMinaerTagModal() {
            this.showMinerTagModal = true
        },

        closeMinerTagModal(forceRefresh) {
            this.showMinerTagModal = false
            if (forceRefresh) {
                this.$emit("closeMinerTagModal")
            }
        }
    },
};
</script>

<style lang="scss">
.workers-table-toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-column-gap: 12px;
    padding: 0 12px;

    .workers-table-toolbar__group {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .workers-table-toolbar__icon {
        fill: $txt-light;
    }

    .workers-table-toolbar__icon--active {
        fill: $main;
    }

    .workers-table-toolbar__button {
        @include button-reset;
    }

    .workers-table-toolbar__button-icon {
        fill: $txt-light;
        transition: $transition;
    }

    .workers-table-toolbar__button-icon--active {
        transform: rotate(180deg);
    }
}

@media screen and (max-width: 1024px) {
    .workers-table-toolbar {
        .workers-table-toolbar__button--remove,
        .workers-table-toolbar__icon {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .workers-table-toolbar {
        padding: 0 8px;

        .workers-table-toolbar__button-icon--active {
            fill: $main;
        }
    }
}
</style>
