<template>
    <div class="ui-input" :class="getViews">
      <select v-model="currentValue" 
        :disabled="disabled" 
        class="ui-input__field"
        :class="getFieldViewClass"
      >
        <option v-if="placeholder" :value="null" disabled selected class="tag-placeholder">{{ placeholder }}</option>
        <option v-for="value of values" :key="value.id" v-bind:value="value" class="tag-option">{{ value.name }}</option>
      </select>
    </div>
</template>

<script>
const VIEWS = {
    full: "ui-input--full",
    default: "",
};

const FIELD_VIEWS = {
    full: "ui-input__field--full",
    error: "ui-input__field--error",
    default: "",
};

export default {
    name: "UISelect",
    props: {
        values: {
            type: Array,
            default: [],
        },
        selected: {
          type: Object,
          default: {}
        },
        placeholder: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getViews() {
            return this.full ? VIEWS.full : VIEWS.default;
        },

        getFieldViewClass() {
            const classes = [];

            if (this.full) {
                classes.push(FIELD_VIEWS.full);
            }

            if (this.error) {
                classes.push(FIELD_VIEWS.error);
            }

            return classes.join(" ");
        },

        currentValue: {
            get() {
                return this.selected;
            },

            set(selected) {
                this.$emit("changed", selected);
            },
        },
    },
};
</script>

<style lang="scss">
.ui-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.ui-input--full {
        width: 100%;
    }

    .ui-input__label {
        font-size: 12px;
        line-height: 14px;
        color: $txt-light;
        margin-bottom: 4px;
    }

    .ui-input__field {
        @include input-reset;
        padding: 14px 16px 14px 20px;
        font-size: 14px;
        line-height: 17px;

        &.ui-input__field--full {
            width: 100%;
        }

        &.ui-input__field--error {
            border-color: $status-red;
        }
    }

    .ui-input__message {
        @include golos-regular;
        font-size: 12px;
        line-height: 14px;
        color: $status-red;
        margin-top: 4px;
    }
}

.tag-option {
  color: blue;
}
</style>
