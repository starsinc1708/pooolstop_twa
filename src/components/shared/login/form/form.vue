<template>
  <div class="login-form">
    <div class="login-form__fields">
      <UIInput
          placeholder="Email Address"
          :value="form.email"
          :full="true"
          :error="getEmailError"
          @changed="onChangeEmail"
      />

      <UIInputPassword
          placeholder="Password"
          :full="true"
          :value="form.password"
          :error="getPasswordError"
          @changed="onChangePassword"
      />

      <UIMessage v-show="message" :message="message"/>
    </div>

    <div class="login-form__remember">
      <UICheckbox :value="remember" @changed="onChangeRemember"/>

      <p class="login-form__remember-label">Remember me for 30 days</p>
    </div>

    <UIButton
        label="Sign in"
        view="main"
        :full="true"
        :disabled="getDisabled"
        :uppercase="true"
        @clicked="onLogin"
    />

    <UILink
        label="Forgot password?"
        view="text-main"
        to="/restore-password"
    />

  </div>
</template>

<script>
import UIInput from "@/components/ui/input/input.vue";
import UIInputPassword from "@/components/ui/input/password.vue";
import UICheckbox from "@/components/ui/checkbox/checkbox.vue";
import UIButton from "@/components/ui/button/button.vue";
import UILink from "@/components/ui/link/link.vue";
import UIMessage from "@/components/ui/message/message.vue";
import {getValidationEmail, setCookie} from "@/utils/functions";
import {PASSWORD_MIN_LENGTH, RESPONSE_STATUSES} from "@/utils/constants";
import Api from "@/api/api";
import {useTelegram} from "@/utils/useTelegram";

const api = new Api();

const { tg, user } = useTelegram();

const DAYS = {
  default: "",
  month: "30d",
};

export default {
  name: "LoginForm",
  components: {
    UIInput,
    UIInputPassword,
    UICheckbox,
    UIButton,
    UILink,
    UIMessage,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      remember: false,
      loading: false,
      message: "",
    };
  },
  computed: {
    getValidationEmail() {
      return getValidationEmail(this.form.email);
    },

    getEmailError() {
      if (this.message) {
        return true;
      }

      if (this.form.email && !this.getValidationEmail) {
        return !this.getValidationEmail;
      }

      return false;
    },

    getValidationPassword() {
      return this.form.password.length >= PASSWORD_MIN_LENGTH;
    },

    getPasswordError() {
      if (this.message) {
        return true;
      }

      if (this.form.password && !this.getValidationPassword) {
        return !this.getValidationPassword;
      }

      return false;
    },

    getDisabled() {
      return (
          !this.getValidationEmail ||
          !this.getValidationPassword ||
          this.loading
      );
    },
  },
  methods: {

    onChangeEmail(email) {
      this.form.email = email;
    },

    onChangePassword(password) {
      this.form.password = password;
    },

    onChangeRemember(remember) {
      this.remember = remember;
    },

    async onLogin() {

      try {
        const {email, password} = this.form;

        this.loading = true;

        this.message = "";

        await api
            .login({
              login: email,
              password,
            })
            .then(async (response) => {
              const {data, status, message} = response;

              if (status === RESPONSE_STATUSES.error) {
                this.message = message;
              } else {
                const {accessToken, refreshToken} = data;

                const days = this.remember
                    ? DAYS.month
                    : DAYS.default;

                setCookie("accessToken", accessToken, days);
                setCookie("refreshToken", refreshToken, days);

                if(user){
                  await api.syncTelegramUser(user, email);
                }

                this.$router.push("/");
              }

              this.loading = false;
            });
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row-gap: 16px;
  height: 100%;

  .login-form__fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row-gap: 8px;
    width: 100%;
  }

  .login-form__remember {
    display: flex;
    align-items: center;
    grid-column-gap: 16px;
    margin-right: auto;
  }

  .login-form__remember-label {
    font-size: 14px;
    line-height: 17px;
    color: $txt-main;
  }
}
</style>
