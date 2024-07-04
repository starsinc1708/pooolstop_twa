<template>
    <div class="ui-language-options">
        <button
            class="ui-language-options__option"
            :class="onOptionViewClass(option)"
            v-for="option in options"
            :key="option.id"
            @click="onOption(option)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<script>
const VIEWS = {
    default: "",
    active: "ui-language-options__option--active",
};

export default {
    name: "UILanguageOptions",
    props: {
        language: {
            type: String,
            default: "en",
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        onOptionViewClass({value}) {
            return this.language === value ? VIEWS.active : VIEWS.default;
        },

        onOption(option) {
            this.$emit("option", option);
        },
    },
};
</script>

<style lang="scss">
.ui-language-options {
    padding: 10px 14px;
    background: $white;
    box-shadow: $cool-shadow;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    grid-row-gap: 6px;

    .ui-language-options__option {
        @include button-reset;
        @include golos-regular;
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        color: $txt-main;
    }

    .ui-language-options__option--active {
        color: $main;
    }
}

@media screen and (max-width: 768px) {
    .ui-language-options {
        background: none;
        box-shadow: none;
        border-radius: 0;
        grid-row-gap: 4px;
        padding: 0;

        .ui-language-options__option {
            font-size: 16px;
            line-height: 30px;
            text-align: end;
        }

        .ui-language-options__option--active {
            @include golos-bold;
            color: $txt-main;
        }
    }
}
</style>
