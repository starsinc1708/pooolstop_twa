<template>
    <div class="ui-terms-content">
        <h3 class="ui-terms-content__title" v-if="title">
            {{ title }}
        </h3>

        <p class="ui-terms-content__label">
            {{ label }}
        </p>
    </div>
</template>

<script>
export default {
    name: "UITermsContent",
    props: {
        title: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss">
.ui-terms-content {
    display: flex;
    flex-direction: column;
    grid-row-gap: 32px;

    .ui-terms-content__title {
        font-size: 20px;
        line-height: 24px;
        color: $txt-main;
        text-align: center;
    }

    .ui-terms-content__label {
        font-size: 12px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .ui-terms-content {
        grid-row-gap: 24px;

        .ui-terms-content__title {
            font-size: 18px;
            line-height: 22px;
        }
    }
}
</style>
