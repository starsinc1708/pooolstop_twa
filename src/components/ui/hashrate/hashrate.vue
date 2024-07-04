<template>
    <div class="ui-hashrate">
        <button
            class="ui-hashrate__toggle"
            v-show="getToggleIsShow"
            @click="onToggle"
        >
            Set Hashrate
        </button>

        <div
            class="ui-hashrate__input"
            :class="getInputViewClass"
            v-show="getInputIsShow"
        >
            <div class="ui-hashrate__group">
                <input
                    class="ui-hashrate__field"
                    type="number"
                    :disabled="disabled"
                    v-model="hashrate"
                />

                <p class="ui-hashrate__label">Th</p>
            </div>

            <button
                class="ui-hashrate__set"
                :disabled="disabled"
                @click="onSet"
            >
                Set
            </button>
        </div>

        <button
            class="ui-hashrate__close"
            v-show="getCloseIsShow"
            :disabled="disabled"
            @click="onClose"
        >
            <img
                class="ui-hashrate__close-icon"
                src="@/assets/images/ui/hashrate/close.svg"
                alt="close"
            />
        </button>
    </div>
</template>

<script>
const INPUT_VIEWS = {
    default: "",
    disabled: "ui-hashrate__input--disabled",
};

export default {
    name: "UIHashrate",
    props: {
        toggle: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            hashrate: "",
        };
    },
    computed: {
        getInputViewClass() {
            return this.disabled ? INPUT_VIEWS.disabled : INPUT_VIEWS.default;
        },

        getToggleIsShow() {
            return !this.toggle;
        },

        getInputIsShow() {
            return this.toggle;
        },

        getCloseIsShow() {
            return this.toggle;
        },
    },
    methods: {
        onToggle() {
            this.$emit("toggle", true);
        },

        onSet() {
            this.$emit("hashrate", this.hashrate);
        },

        onClose() {
            this.hashrate = "";

            this.$emit("toggle", false);
        },
    },
};
</script>

<style lang="scss">
.ui-hashrate {
    display: flex;
    align-items: center;
    grid-column-gap: 7px;
    height: 28px;

    .ui-hashrate__toggle {
        @include button-reset;
        @include golos-regular;
        font-size: 12px;
        line-height: 17px;
        color: $main;
        white-space: nowrap;

        &:hover {
            color: $main-hover;
        }

        &:active {
            color: $main-active;
        }
    }

    .ui-hashrate__input {
        background: linear-gradient(0deg, #36a1ea, #36a1ea),
            linear-gradient(180deg, #8c4af2 0%, #595df9 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
        height: 28px;
        padding: 2px 12px 2px 2px;
        display: flex;
        align-items: center;
        width: 114px;
        transition: $transition;
    }

    .ui-hashrate__input--disabled {
        opacity: $opacity;
    }

    .ui-hashrate__group {
        position: relative;
        display: flex;
        align-items: center;
        height: 24px;
    }

    .ui-hashrate__field {
        @include golos-regular;
        background: $gray-100;
        border: none;
        outline: none;
        font-size: 12px;
        line-height: 18px;
        color: $txt-main;
        border-radius: 8px;
        width: 100%;
        height: 100%;
        padding: 0 30px 0 10px;
        appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    .ui-hashrate__label {
        font-size: 12px;
        line-height: 18px;
        color: $txt-light;
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
    }

    .ui-hashrate__set {
        @include button-reset;
        @include golos-regular;
        font-size: 12px;
        line-height: 18px;
        color: $white;
    }

    .ui-hashrate__close {
        @include button-reset;

        &:disabled {
            opacity: $opacity;
        }
    }
}
</style>
