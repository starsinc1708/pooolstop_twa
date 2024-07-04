<template>
    <div class="ui-message">
        <p class="ui-message__label">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "UIMessage",
    props: {
        message: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss">
.ui-message {
    .ui-message__label {
        font-size: 12px;
        line-height: 16px;
        /* Status/Red */

        color: $status-red;
    }
}
</style>
