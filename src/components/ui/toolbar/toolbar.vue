<template>
    <div class="ui-toolbar">
        <UIToolbarHeader />
<!--        <UIToolbarTabs class="ui-toolbar__tabs" />-->
        <UIToolbarService class="ui-toolbar__service" />
    </div>
</template>

<script>
import UIToolbarHeader from "@/components/ui/toolbar/header.vue";
import UIToolbarTabs from "@/components/ui/toolbar/tabs.vue";
import UIToolbarService from "@/components/ui/toolbar/service.vue";

export default {
    name: "UIToolbar",
    components: {
        UIToolbarHeader,
        UIToolbarTabs,
        UIToolbarService,
    },
};
</script>

<style lang="scss">
.ui-toolbar {
    background: $main;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 44px 52px 40px 12px;

    &::after {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        bottom: 0;
        background: #ecf6fc;
        width: 40px;
        border-radius: 20px 0 0 20px;
    }
}

@media screen and (max-width: 768px) {
    .ui-toolbar {
        padding: 0 19px 18px 19px;
        grid-row-gap: 18px;
        width: 100%;

        &::after {
            left: 0;
            top: auto;
            width: 100%;
            height: 22px;
            border-radius: 25px 25px 0 0;
        }

        .ui-toolbar__tabs {
            margin: 0;
        }

        .ui-toolbar__service {
            display: none;
        }
    }
}
</style>
