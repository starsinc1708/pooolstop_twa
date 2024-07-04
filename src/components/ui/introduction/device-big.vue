<template>
    <div class="ui-introduction-device-big">
        <div class="ui-introduction-device-big__wrapper">
            <div class="ui-introduction-device-big__background">
                <div class="ui-introduction-device-big__button">
                    <UISvg icon="plus" />

                    Add Device
                </div>
            </div>

            <div class="ui-introduction-device-big__tooltip">
                <div class="ui-introduction-device-big__tooltip-content">
                    <p class="ui-introduction-device-big__tooltip-label">
                        Or here
                    </p>

                    <div
                        class="ui-introduction-device-big__tooltip-triangle"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";

export default {
    name: "UIIntroductionDeviceBig",
    components: {
        UISvg,
    },
};
</script>

<style lang="scss">
.ui-introduction-device-big {
    .ui-introduction-device-big__wrapper {
        position: relative;
    }

    .ui-introduction-device-big__background {
        background: $main;
        border-radius: 20px;
        padding: 13px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ui-introduction-device-big__button {
        @include golos-medium;
        padding: 14px 10px 20px;
        border: 1px dashed rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-row-gap: 4px;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.5);
        width: 116px;
        height: 84px;
        transition: all 0.3s;
    }

    .ui-introduction-device-big__tooltip {
        position: absolute;
        top: 50%;
        left: 148px;
        transform: translateY(-50%);
    }

    .ui-introduction-device-big__tooltip-content {
        background: #212325;
        box-shadow: 0px 10px 40px rgba(33, 35, 37, 0.3);
        padding: 17px 50px;
        border-radius: 10px;
        position: relative;
    }

    .ui-introduction-device-big__tooltip-label {
        @include golos-medium;
        font-size: 14px;
        line-height: 17px;
        color: $white;
        white-space: nowrap;
    }

    .ui-introduction-device-big__tooltip-triangle {
        position: absolute;
        top: 22px;
        left: -10px;
        transform: rotate(270deg);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #212325;
        box-shadow: 0px 10px 40px rgba(33, 35, 37, 0.3);
    }
}
</style>
