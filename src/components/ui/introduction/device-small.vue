<template>
    <div class="ui-introduction-device-small">
        <div class="ui-introduction-device-small__wrapper">
            <div class="ui-introduction-device-small__background">
                <div class="ui-introduction-device-small__button">
                    <UISvg icon="plusWhite" />

                    Add Device
                </div>
            </div>

            <div class="ui-introduction-device-small__tooltip">
                <div class="ui-introduction-device-small__tooltip-content">
                    <p class="ui-introduction-device-small__tooltip-label">
                        Add your first Device here
                    </p>

                    <div
                        class="ui-introduction-device-small__tooltip-triangle"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UIIntroductionDeviceSmall",
};
</script>

<style lang="scss">
.ui-introduction-device-small {
    .ui-introduction-device-small__wrapper {
        position: relative;
    }

    .ui-introduction-device-small__background {
        background: $bg-light;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 17px;
        cursor: default;
        width: 170px;
    }

    .ui-introduction-device-small__button {
        @include golos-medium;
        font-size: 14px;
        line-height: 17px;
        color: $white;
        background: $main;
        border-radius: 10px;
        height: 40px;
        width: 136px;
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column-gap: 8px;
    }

    .ui-introduction-device-small__tooltip {
        position: absolute;
        top: 50%;
        right: 182px;
        transform: translateY(-50%);
    }

    .ui-introduction-device-small__tooltip-content {
        background: #212325;
        box-shadow: 0px 10px 40px rgba(33, 35, 37, 0.3);
        padding: 17px 26px;
        border-radius: 10px;
        position: relative;
    }

    .ui-introduction-device-small__tooltip-label {
        @include golos-medium;
        font-size: 14px;
        line-height: 17px;
        color: $white;
        white-space: nowrap;
    }

    .ui-introduction-device-small__tooltip-triangle {
        position: absolute;
        top: 22px;
        right: -10px;
        transform: rotate(90deg);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #212325;
        box-shadow: 0px 10px 40px rgba(33, 35, 37, 0.3);
    }
}

@media screen and (max-width: 768px) {
    .ui-introduction-device-small {
        .ui-introduction-device-small__tooltip {
            top: 86px;
            right: 0;
            transform: translateY(0);
        }

        .ui-introduction-device-small__tooltip-triangle {
            top: -7px;
            right: 75px;
            transform: rotate(0);
        }
    }
}
</style>
