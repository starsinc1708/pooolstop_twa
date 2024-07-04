<template>
  <div class="ui-toolbar-tabs">
    <router-link
        class="ui-toolbar-tabs__tab"
        :class="tab.class"
        v-for="tab in getTabs"
        :key="tab.id"
        :to="tab.to"
    >
      <div class="ui-toolbar-tabs__icon">
        <img class="ui-toolbar-tabs__img" :src="tab.icon" alt="icon" />
      </div>

      <p class="ui-toolbar-tabs__label">
        {{ tab.label }}
      </p>
    </router-link>
  </div>
</template>


<script>
export default {
    name: "UIToolbarTabs",
    computed: {
        getTabs() {
            return [
                {
                    id: 0,
                    label: "Statistics",
                    icon: require("@/assets/images/ui/toolbar/statistics.svg"),
                    to: "/",
                    class: "",
                },
                {
                    id: 1,
                    label: "Workers",
                    icon: require("@/assets/images/ui/toolbar/workers.svg"),
                    to: "/workers",
                    class: "",
                },
                {
                    id: 2,
                    label: "Wallet",
                    icon: require("@/assets/images/ui/toolbar/wallet.svg"),
                    to: "/wallet",
                    class: "",
                },
                {
                    id: 3,
                    label: "Rating",
                    icon: require("@/assets/images/ui/toolbar/rating.svg"),
                    to: "/rating",
                    class: "ui-toolbar-tabs__tab--disabled",
                },
                {
                    id: 4,
                    label: "Settings",
                    icon: require("@/assets/images/ui/toolbar/settings.svg"),
                    to: "/settings",
                    class: "ui-toolbar-tabs__tab--disabled",
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.ui-toolbar-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: $bg-light;
  padding: 5px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  z-index: 1000;
  .ui-toolbar-tabs__tab {
    @include button-reset;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .ui-toolbar-tabs__label {
      font-size: 9px;
      display: block;
      color: #9e9fa8;
    }

    &.router-link-exact-active {
      .ui-toolbar-tabs__img {
        filter: invert(48%) sepia(79%) saturate(2005%) hue-rotate(179deg) brightness(89%) contrast(88%);
      }
      .ui-toolbar-tabs__label {
        color: #1f8cd7;
      }
    }

    &:disabled {
      opacity: $opacity;
      pointer-events: none;
    }
  }

  .ui-toolbar-tabs__tab--disabled {
    opacity: $opacity;
    pointer-events: none;
  }

  .ui-toolbar-tabs__icon {
    width: 40px;
    height: 40px;
    padding: 5px;
    border-radius: 10px;
    transition: $transition;
    display: flex;
    justify-content: center;
    align-items: center;

    .ui-toolbar-tabs__img {
      filter: invert(29%) sepia(8%) saturate(470%) hue-rotate(164deg) brightness(92%) contrast(85%);
    }
  }

  .ui-toolbar-tabs__label {
    @include golos-medium;
    font-size: 9px;
    line-height: 12px;
    text-align: center;
    text-transform: uppercase;
    color: #4a4f53;
    transition: $transition;
  }
}

@media screen and (max-width: 768px) {
  .ui-toolbar-tabs {
    flex-direction: row;
    justify-content: space-around;
    grid-column-gap: 10px;
    padding: 5px 0;

    .ui-toolbar-tabs__icon {
      width: 40px;
      height: 40px;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>






