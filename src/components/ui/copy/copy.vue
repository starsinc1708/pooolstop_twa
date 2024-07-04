<template>
    <UIButton
        class="ui-copy"
        label="Copy"
        view="light"
        :disabled="disabled"
        @clicked="onCopy"
    />
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "UICopy",
    components: {
        UIButton,
    },
    props: {
        text: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            disabled: false,
        };
    },
    methods: {
        async onCopy() {
            try {
                this.disabled = true;

                await navigator.clipboard.writeText(this.text).then(() => {
                    setTimeout(() => {
                        this.disabled = false;
                    }, 1000);
                });
            } catch (e) {
                this.disabled = false;
            }
        },
    },
};
</script>

<style lang="scss">
.ui-copy {
}
</style>
