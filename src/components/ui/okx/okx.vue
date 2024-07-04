<template>
    <a class="ui-okx" href="#">
        <p class="ui-okx__label">by</p>

        <img
            class="ui-okx__icon"
            src="@/assets/images/ui/okx/okx.svg"
            alt="okx"
        />
    </a>
</template>

<script>
export default {
    name: "UIOkx",
};
</script>

<style lang="scss">
.ui-okx {
    padding: 8px 16px 8px 14px;
    border: 1px solid rgba(158, 159, 168, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    grid-column-gap: 8px;
    transition: $transition;

    &:hover {
        border-color: $main;
    }

    .ui-okx__label {
        font-size: 14px;
        line-height: 21px;
        color: $txt-light;
    }
}
</style>
