<template>
  <div class="default-layout">
    <UIToolbar class="default-layout__toolbar"/>

    <div class="default-layout__container">
      <div class="default-layout__view">
        <UIHeader class="default-layout__header"/>
        <router-view/>
      </div>
    </div>
    <UIToolbarTabs class="ui-toolbar__tabs"/>

    <transition name="modal" mode="out-in">
      <component class="default-layout__modal" :is="getComponent"/>
    </transition>

    <transition name="notification">
      <UINotification
          class="default-layout__notification"
          v-if="getNotification"
      />
    </transition>
  </div>
</template>

<script>
import UIToolbar from "@/components/ui/toolbar/toolbar.vue";
import UIHeader from "@/components/ui/header/header.vue";
import UIDevice from "@/components/ui/device/device.vue";
import UIIntroduction from "@/components/ui/introduction/introduction.vue";
import UIMenu from "@/components/ui/menu/menu.vue";
import UINotification from "@/components/ui/notification/notification.vue";

import {MODALS} from "@/store/modal.js";

import {getCookie} from "@/utils/functions.js";
import UIToolbarTabs from "@/components/ui/toolbar/tabs.vue";

export default {
  name: "DefaultLayout",
  components: {
    UIToolbarTabs,
    UIToolbar,
    UIHeader,
    UIDevice,
    UIIntroduction,
    UIMenu,
    UINotification,
  },
  created() {
    this.onSetUser();
  },
  mounted() {
    this.onIntroduction();
  },
  computed: {
    getModal() {
      return this.$store.state.modal.modal;
    },

    getNotification() {
      return this.$store.state.notification.notification;
    },

    getComponent() {
      switch (this.getModal) {
        case MODALS.device:
          return UIDevice;
        case MODALS.introduction:
          return UIIntroduction;
        case MODALS.menu:
          return UIMenu;
        default:
          return MODALS.default;
      }
    },
  },
  methods: {
    onIntroduction() {
      if (getCookie("introduction")) {
        this.$store.commit("modal/setModal", MODALS.introduction);
      }
    },

    async onSetUser() {
      const Api = (await import("@/api/api")).default;

      const api = new Api();

      await Promise.all([api.user(), api.balance(), api.stratum()]).then(
          ([user, balance, stratum]) => {
            this.$store.commit("setUser", user);
            this.$store.commit("setBalance", balance);
            this.$store.commit("setStratum", stratum);
          }
      );
    },
  },
};
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  .default-layout__toolbar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .default-layout__container {
    width: 100%;
    padding-left: 180px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 56px;
    justify-content: flex-start;
  }

  .default-layout__view {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-row-gap: 5px;
    padding: 0 40px 38px 0;
    background: $bg-light;
    flex-grow: 1;
  }

  .default-layout__tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: $bg-light;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .default-layout__modal {
    @include modal;
  }

  .default-layout__notification {
    @include notification;
  }
}

@media screen and (max-width: 768px) {
  .default-layout {
    align-items: center;

    .default-layout__toolbar {
      position: relative;
    }

    .default-layout__header {
      display: none;
    }

    .default-layout__view {
      padding: 0 0 34px 0;
      border-radius: 30px 30px 0 0;
    }

    .default-layout__container {
      width: 90%;
      padding-left: 0;
    }

    .default-layout__tabs {
      width: 100%;
    }
  }
}

</style>
