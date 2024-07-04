<template>
  <div class="ui-card-container">
    <div class="ui-card">
        <UICardHeader class="ui-card__header" :header="header" />

        <slot />

        <UICardFooter class="ui-card__footer" :footer="footer" />
    </div>
  </div>
</template>

<script>
import UICardHeader from "@/components/ui/card/header.vue";
import UICardFooter from "@/components/ui/card/footer.vue";

export default {
    name: "UICard",
    components: {
        UICardHeader,
        UICardFooter,
    },
    props: {
        header: {
            type: Object,
            required: true,
        },
        footer: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">

.ui-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.ui-card {
  background: $white;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  .ui-card__header {
    margin-bottom: 55px;
  }

  .ui-card__footer {
    margin-top: 20px;
  }
}

@media screen and (max-width: 768px) {
  .ui-card {
    padding: 20px;
    width: 100%;
    height: auto;
    min-width: 379px;
    max-width: 379px;
    margin: 0 10px; // Немного отступа от краев экрана
  }
}
</style>
