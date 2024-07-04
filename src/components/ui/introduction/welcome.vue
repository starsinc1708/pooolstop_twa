<template>
    <div class="introduction-welcome">
        <div class="introduction-welcome__wrapper">
            <div class="introduction-welcome__content">
                <h2 class="introduction-welcome__title">Welcome on board!</h2>

                <p class="introduction-welcome__label">
                    Ready to rock your income?
                </p>

                <UIButton
                    label="Let's go!"
                    view="main"
                    :full="true"
                    :uppercase="true"
                    @clicked="onWelcome"
                />
            </div>
        </div>
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "IntroductionWelcome",
    components: {
        UIButton,
    },
    methods: {
        onWelcome() {
            this.$emit("welcome");
        },
    },
};
</script>

<style lang="scss">
.introduction-welcome {
    padding-top: 199px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;

    .introduction-welcome__wrapper {
        width: 640px;
        background: $white;
        border-radius: 20px;
        background-image: url("@/assets/images/ui/introduction/welcome.svg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .introduction-welcome__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-row-gap: 32px;
        padding: 120px 150px 105px 150px;
    }

    .introduction-welcome__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
    }

    .introduction-welcome__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 768px) {
    .introduction-welcome {
        padding-top: 0;
        align-items: flex-end;

        .introduction-welcome__wrapper {
            width: 100%;
        }

        .introduction-welcome__content {
            width: 360px;
            padding: 32px 0 24px 0;
            margin: 0 auto;
            grid-row-gap: 24px;
        }

        .introduction-welcome__title {
            font-size: 24px;
            line-height: 29px;
        }
    }
}
</style>
