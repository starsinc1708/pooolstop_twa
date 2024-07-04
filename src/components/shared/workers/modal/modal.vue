<template>
    <UIModal class="workers-modal" @close="onClose">
        <div class="workers-modal__content">
            <h2 class="workers-modal__title">Delete Worker</h2>

            <p class="workers-modal__label">
                This action will delete all the data about selected worker
            </p>

            <div class="workers-modal__footer">
                <UIButton
                    label="Delete Worker"
                    view="red"
                    :full="true"
                    :disabled="getDisabled"
                    @clicked="onRemove"
                />
            </div>
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import UIButton from "@/components/ui/button/button.vue";

import {NOTIFICATIONS} from "@/store/notification";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "WorkersModal",
    components: {
        UIModal,
        UIButton,
    },
    props: {
        worker: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        getDisabled() {
            return this.loading;
        },
    },
    methods: {
        async onRemove() {
            try {
                this.loading = true;

                const {id, name} = this.worker;

                await api
                    .deleteMiner({
                        id,
                        name,
                        delete: true,
                    })
                    .then(async () => {
                        await api.workers().then((workers) => {
                            this.$store.commit(
                                "notification/setNotification",
                                NOTIFICATIONS.deleteWorker
                            );

                            this.loading = false;

                            this.$emit("workers", workers);
                            this.onClose();
                        });
                    });
            } catch (e) {
                this.loading = false;
            }
        },

        onClose() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss">
.workers-modal {
    .workers-modal__content {
        width: 640px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 48px 0;
    }

    .workers-modal__title {
        @include golos-semi-bold;
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }

    .workers-modal__label {
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: $txt-main;
        margin: 40px 0 48px 0;
    }

    .workers-modal__footer {
        padding: 0 150px;
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    .workers-modal {
        .workers-modal__content {
            width: 100%;
            padding: 32px 0 24px 0;
        }

        .workers-modal__title {
            font-size: 24px;
            line-height: 29px;
        }

        .workers-modal__label {
            font-size: 14px;
            line-height: 17px;
            margin: 28px 0 32px 0;
        }

        .workers-modal__footer {
            padding: 0 32px;
        }
    }
}
</style>
