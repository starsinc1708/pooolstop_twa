<template>
    <div class="ui-notification">
        <div class="ui-notification__wrapper">
            <UISvg class="ui-notification__logo" :icon="getIcon" />

            <button
                class="ui-notification__close"
                v-if="close"
                @click="onClose"
            >
                <UISvg class="ui-notification__close-icon" icon="crossSmall" />
            </button>

            <div class="ui-notification__info">
                <h5 class="ui-notification__title" v-if="getTitle">
                    {{ getTitle }}
                </h5>

                <p class="ui-notification__label" v-if="getLabel">
                    {{ getLabel }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

import {NOTIFICATIONS} from "@/store/notification";

const TITLES = {
    registration: "Almost Done!",
    deleteWorker: "Worker deleted successfully",
};

const LABELS = {
    registration: "Follow the link from the email to complete the registration",
    deleteWorker: "",
};

export default {
    name: "UINotification",
    components: {
        UISvg,
    },
    props: {
        close: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        this.onTimer();
    },
    computed: {
        getIcon() {
            return this.getNotification;
        },

        getNotification() {
            return this.$store.state.notification.notification;
        },

        getTitle() {
            return TITLES[this.getNotification];
        },

        getLabel() {
            return LABELS[this.getNotification];
        },
    },
    methods: {
        onClose() {
            this.$store.commit(
                "notification/setNotification",
                NOTIFICATIONS.default
            );
        },

        onTimer() {
            if (!this.close) {
                setTimeout(() => {
                    this.$store.commit(
                        "notification/setNotification",
                        NOTIFICATIONS.default
                    );
                }, 3000);
            }
        },
    },
};
</script>

<style lang="scss">
.ui-notification {
    .ui-notification__wrapper {
        background: $white;
        box-shadow: $tooltip-shadow;
        border-radius: 20px;
        padding: 28px 29px 28px 26px;
        display: flex;
        align-items: center;
        grid-column-gap: 24px;
        position: relative;
        min-width: 381px;
        max-width: 540px;
    }

    .ui-notification__info {
        display: flex;
        flex-direction: column;
        grid-row-gap: 4px;
    }

    .ui-notification__title {
        @include golos-semi-bold;
        font-size: 18px;
        line-height: 22px;
        color: $txt-main;
    }

    .ui-notification__label {
        font-size: 14px;
        line-height: 21px;
        color: $txt-main;
    }

    .ui-notification__close {
        @include button-reset;
        position: absolute;
        top: 12px;
        right: 12px;
    }

    .ui-notification__close-icon {
        fill: $txt-light;
    }
}

@media screen and (max-width: 768px) {
    .ui-notification {
        .ui-notification__wrapper {
            max-width: 319px;
            min-width: 319px;
            padding: 64px 17px 35px 17px;
            margin: 0 auto;
        }

        .ui-notification__logo {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
        }

        .ui-notification__info {
            align-items: center;
            text-align: center;
            grid-row-gap: 10px;
        }

        .ui-notification__close {
            top: 14px;
            right: 14px;
        }
    }
}
</style>
