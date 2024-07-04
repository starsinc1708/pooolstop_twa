<template>
    <div class="ui-device-header">
        <h2 class="ui-device-header__title">Add Device</h2>

        <p class="ui-device-header__label">
            Set up your stratum configuration:
        </p>
    </div>
</template>

<script>
export default {
    name: "UIDeviceHeader",
};
</script>

<style lang="scss">
.ui-device-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row-gap: 32px;

    .ui-device-header__title {
        @include golos-semi-bold;
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
    }

    .ui-device-header__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .ui-device-header {
        grid-row-gap: 24px;

        .ui-device-header__title {
            font-size: 24px;
            line-height: 29px;
        }
    }
}
</style>
