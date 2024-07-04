<template>
    <div class="ui-language" v-click-outside="onHide">
        <UILanguageToggle
            :language="language"
            :visible="visible"
            :disabled="disabled"
            @toggle="onVisible"
        />

        <UILanguageOptions
            class="ui-language__options"
            :class="getOptionsViewClass"
            :language="language"
            :options="options"
            @option="onChangeLanguage"
        />
    </div>
</template>

<script>
import UILanguageToggle from "@/components/ui/language/toggle.vue";
import UILanguageOptions from "@/components/ui/language/options.vue";

const OPTIONS_VIEWS = {
    default: "",
    visible: "ui-language__options--visible",
};

export default {
    name: "UILanguage",
    components: {
        UILanguageToggle,
        UILanguageOptions,
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            visible: false,
            language: "en",
        };
    },
    computed: {
        getOptionsViewClass() {
            return this.visible ? OPTIONS_VIEWS.visible : OPTIONS_VIEWS.default;
        },
    },
    methods: {
        onVisible() {
            this.visible = !this.visible;
        },

        onHide() {
            this.visible = false;
        },

        onChangeLanguage({value}) {
            this.language = value;
        },
    },
};
</script>

<style lang="scss">
.ui-language {
    position: relative;

    .ui-language__options {
        position: absolute;
        top: 46px;
        visibility: hidden;
        opacity: 0;
        transition: $transition;
        z-index: 9999;
    }

    .ui-language__options--visible {
        visibility: visible;
        opacity: 1;
    }
}

@media screen and (max-width: 768px) {
    .ui-language {
        .ui-language__options {
            top: 37px;
            right: 24px;
        }
    }
}
</style>
