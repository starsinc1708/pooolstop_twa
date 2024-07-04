<template>
    <div class="ui-header-profile">
        <UILanguage :options="getOptions" :disabled="true" />

        <div class="ui-header-profile__user">
            <p class="ui-header-profile__label">{{ getUser.email }}</p>

            <UIIcon icon="logout" @clicked="onLogout" />
        </div>
    </div>
</template>

<script>
import UILanguage from "@/components/ui/language/language.vue";
import UIIcon from "@/components/ui/icon/icon.vue";
import { removeCookie } from "@/utils/functions";

export default {
  name: "UIHeaderProfile",
  components: {
    UILanguage,
    UIIcon,
  },
  computed: {
    getOptions() {
      return [
        {
          id: 0,
          label: "En",
          value: "en",
        },
        {
          id: 1,
          label: "Ru",
          value: "ru",
        },
      ];
    },

    getUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    onLogout() {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      this.$router.push("/login");
    },
  },
};

</script>


<style lang="scss">
.ui-header-profile {
    display: flex;
    align-items: center;
    grid-column-gap: 16px;

    .ui-header-profile__user {
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
    }

    .ui-header-profile__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
    }
}

@media screen and (max-width: 1024px) {
    .ui-header-profile {
        .ui-header-profile__label {
            display: none;
        }
    }
}
</style>
