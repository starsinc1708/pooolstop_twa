<template>
    <div class="ui-card-header">
        <img class="ui-card-header__logo" :src="getLogo" alt="logo" />

        <h1 class="ui-card-header__title">
            {{ header.title }}
        </h1>
    </div>
</template>

<script>
const LOGOS = {
    fingerprint: require("@/assets/images/ui/card/fingerprint.svg"),
    user: require("@/assets/images/ui/card/user.svg"),
    restore: require("@/assets/images/ui/card/restore.svg"),
};

export default {
    name: "UICardHeader",
    props: {
        header: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getLogo() {
            const {logo} = this.header;

            return LOGOS[logo];
        },
    },
};
</script>

<style lang="scss">
.ui-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row-gap: 32px;

    .ui-card-header__title {
        font-size: 28px;
        line-height: 34px;
        color: $txt-main;
        white-space: nowrap;
    }

    .ui-card-header__logo {
        display: block;
    }
}
</style>
