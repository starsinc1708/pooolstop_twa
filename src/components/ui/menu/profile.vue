<template>
  <div class="ui-menu-profile">
    <div class="ui-menu-profile__group">
      <UISvg icon="user"/>

      <p class="ui-menu-profile__label">
        {{ getEmail }}
      </p>

      <div class="telegram-link-group">
        <img
            class="ui-svg__icon"
            src="@/assets/images/ui/svg/telegram-logo.svg"
            alt="binance"
            width="19"
            height="19"
        />
        <a class="ui-menu-tg-profile__label">
          {{ getTelegramUsername }}
        </a>
      </div>
    </div>

    <UIMenuLanguage/>
  </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UIMenuLanguage from "@/components/ui/menu/language.vue";
import {useTelegram} from '@/utils/useTelegram';

const {user} = useTelegram();

export default {
  name: "UIMenuProfile",
  components: {
    UISvg,
    UIMenuLanguage,
  },
  computed: {
    getEmail() {
      return this.$store.state.user.email;
    },
    getTelegramUsername() {
      if (user) {
        return "@" + user.username
      } else
        return "guest"
    }
  },
};
</script>

<style lang="scss">
.ui-menu-profile {
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;

  .ui-menu-profile__group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-row-gap: 16px;
    padding-bottom: 32px;
    border-bottom: 1px solid $gray;

    .telegram-link-group {
      width: 100%;
      display: flex;


      .ui-menu-tg-profile__label {
        font-size: 16px;
        text-align: center;
        margin-left: 10px;
        color: $txt-light;
      }
    }
  }

  .ui-menu-profile__label {
    @include golos-bold;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: $txt-main;
  }
}
</style>
