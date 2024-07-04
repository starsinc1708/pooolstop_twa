<template>
    <div class="ui-introduction-board" @click="onBoard">
        <div class="ui-introduction-board__container">
            <UIIntroductionDeviceSmall
                class="ui-introduction-board__device-small"
            />

            <UIIntroductionDeviceBig
                class="ui-introduction-board__device-big"
            />
        </div>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UIIntroductionDeviceSmall from "@/components/ui/introduction/device-small.vue";
import UIIntroductionDeviceBig from "@/components/ui/introduction/device-big.vue";

export default {
    name: "UIIntroductionBoard",
    components: {
        UISvg,
        UIIntroductionDeviceSmall,
        UIIntroductionDeviceBig,
    },
    methods: {
        onBoard() {
            this.$emit("board");
        },
    },
};
</script>

<style lang="scss">
.ui-introduction-board {
    width: 100%;
    height: 100%;
    position: relative;

    .ui-introduction-board__device-small {
        position: absolute;
        top: 62px;
        right: 40px;
    }

    .ui-introduction-board__device-big {
        position: absolute;
        left: 2px;
        bottom: 30px;
    }
}

@media screen and (max-width: 768px) {
    .ui-introduction-board {
        display: flex;
        justify-content: center;

        .ui-introduction-board__container {
            width: 360px;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding-top: 103px;
        }

        .ui-introduction-board__device-small {
            position: initial;
            margin-left: auto;
        }

        .ui-introduction-board__device-big {
            display: none;
        }
    }
}
</style>
