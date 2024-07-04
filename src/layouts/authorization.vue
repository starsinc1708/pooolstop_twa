<template>
    <div class="authorization-layout">
<!--        <a class="authorization-layout__logo" href="https://start.poools.top">
            <img
                
                src="@/assets/images/shared/layouts/authorization/logo.svg"
                alt="logo"
            />
        </a>

        <img
            class="authorization-layout__vector"
            src="@/assets/images/shared/layouts/authorization/vector.svg"
            alt=""
        />-->

        <transition name="notification">
            <UINotification
                class="authorization-layout__notification"
                v-if="getNotification"
                :close="true"
            />
        </transition>

        <transition name="modal">
            <UITerms
                class="authorization-layout__modal"
                v-if="getTermsIsShow"
            />
        </transition>

        <router-view class="authorization-layout__view" />
    </div>
</template>

<script>
import UINotification from "@/components/ui/notification/notification.vue";
import UITerms from "@/components/ui/terms/terms.vue";

import {MODALS} from "@/store/modal.js";
import {NOTIFICATIONS} from "@/store/notification.js";

export default {
    name: "AuthorizationLayout",
    components: {
        UINotification,
        UITerms,
    },
    computed: {
        getNotification() {
            return (
                this.$store.state.notification.notification ===
                NOTIFICATIONS.registration
            );
        },

        getModal() {
            return this.$store.state.modal.modal;
        },

        getTermsIsShow() {
            return this.getModal === MODALS.terms;
        },
    }
};
</script>

<style lang="scss">
.authorization-layout {
    .authorization-layout__logo {
        z-index: 1;
    }

    .authorization-layout__notification {
        @include notification;
    }


    .authorization-layout__view {
        z-index: 1;
    }

    .authorization-layout__modal {
        @include modal;
    }
}

@media screen and (max-width: 1440px) {
    .authorization-layout {

        .authorization-layout__vector {
            left: -140px;
        }
    }
}

@media screen and (max-width: 1024px) {
    .authorization-layout {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        .authorization-layout__vector {
            display: none;
        }
    }
}

</style>
