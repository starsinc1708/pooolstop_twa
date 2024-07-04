<template>
    <div class="ui-menu-language">
        <p class="ui-menu-language__label">Language</p>

        <UILanguage :options="getOptions" :disabled="true" />
    </div>
</template>

<script>
import UILanguage from "@/components/ui/language/language.vue";

export default {
    name: "UIMenuLanguage",
    components: {
        UILanguage,
    },
    computed: {
        getOptions() {
            return [
                {
                    id: 0,
                    label: "English",
                    value: "en",
                },
                {
                    id: 1,
                    label: "Русский",
                    value: "ru",
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.ui-menu-language {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ui-menu-language__label {
        font-size: 16px;
        line-height: 19px;
        color: $txt-main;
    }
}
</style>
