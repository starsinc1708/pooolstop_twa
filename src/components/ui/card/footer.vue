<template>
    <div class="ui-card-footer">
        <p class="ui-card-footer__title">{{ footer.title }}</p>

        <UILink
            class="ui-card-footer__link"
            :label="footer.label"
            :to="footer.to"
            view="main-outline"
            :full="true"
        />

        <button class="ui-card-footer__terms" @click="onTerms">
            Terms of Service
        </button>
    </div>
</template>

<script>
import UILink from "@/components/ui/link/link.vue";

import {MODALS} from "@/store/modal.js";

export default {
    name: "UICardFooter",
    components: {
        UILink,
    },
    props: {
        footer: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onTerms() {
            this.$store.commit("modal/setModal", MODALS.terms);
        },
    },
};
</script>

<style lang="scss">
.ui-card-footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    .ui-card-footer__title {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }

    .ui-card-footer__link {
        margin: 19px 0 20px 0;
    }

    .ui-card-footer__terms {
        @include button-reset;
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
    }
}
</style>
