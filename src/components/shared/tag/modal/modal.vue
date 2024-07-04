<template>
    <UIModal class="tag-modal" @close="onClose(false)">
        <div class="tag-modal__content">
            <h2 class="tag-modal__title">Add Tag</h2>
            <div class="tag-name">
                <UIInput
                    placeholder="Tag name"
                    :value="name"
                    :full="true"
                    @changed="onChangeName"
                />

                <UIButton
                    label="Add"
                    view="main"
                    :full="false"
                    :disabled="getDisabledAdd"
                    @clicked="addTag"
                />
            </div>
            <h2 class="tag-modal__title">Remove Tag</h2>
            <div class="tag-delete">
                <UISelect 
                    :values="tags" 
                    :selected="selectTag" 
                    :full="true"
                    :placeholder="'Select Tag...'"
                    @changed="onChangeDelete"
                />
                <UIButton
                    label="Delete"
                    view="red"
                    :full="false"
                    @clicked="deleteTag"
                    :disabled="!selectTag"
                />
            </div>
        </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import UIButton from "@/components/ui/button/button.vue";
import UIInput from "@/components/ui/input/input.vue";
import UISelect from "@/components/ui/input/select.vue";

import {NOTIFICATIONS} from "@/store/notification";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "tagModal",
    components: {
        UIModal,
        UIButton,
        UIInput,
        UISelect
    },
    props: {
        tags: {
            type: Array,
            required: true,
        },
    },
    computed: {
        getDisabledAdd() {
            return !this.name || this.tags.includes(this.name.trim())
        }
    },
    data() {
        return {
            loading: false,
            name: null,
            selectTag: null
        };
    },
    methods: {
        onClose(forceRefreshTag, forceRefreshMiners) {
            this.$emit("closeTagModal", forceRefreshTag, forceRefreshMiners);
        },

        onChangeName(name) {
            this.name = name
        },

        onChangeDelete(tag) {
            this.selectTag = tag
        },

        async addTag() {
            if (this.name && !this.tags.includes(this.name.trim())) {
                const body = { name: this.name }
                await api.addUserTag(body).then(() => {
                    this.onClose(true, false)
                })
            }
        },

        async deleteTag() {
            if (this.selectTag) {
                const body = { id: this.selectTag.id }
                await api.deleteUserTag(body).then(() => {
                    this.onClose(true, true)
                })
            }
        }
    },
};
</script>

<style lang="scss">
.tag-modal {
    .tag-modal__content {
        width: 540px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 48px 0;
    }

    .tag-modal__title {
        @include golos-semi-bold;
        font-size: 28px;
        line-height: 34px;
        text-align: center;
        color: $txt-main;
        margin-bottom: 20px;
    }

    .tag-modal__label {
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: $txt-main;
        margin: 40px 0 48px 0;
    }

    .tag-modal__footer {
        padding: 0 150px;
        width: 100%;
    }
}

.tag-name {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    width: 60%;
}

.tag-delete {
    display: flex;
    align-items: center;
    width: 60%;
}

@media screen and (max-width: 768px) {
    .tag-modal {
        .tag-modal__content {
            width: 100%;
            padding: 32px 0 24px 0;
        }

        .tag-modal__title {
            font-size: 24px;
            line-height: 29px;
        }

        .tag-modal__label {
            font-size: 14px;
            line-height: 17px;
            margin: 28px 0 32px 0;
        }

        .tag-modal__footer {
            padding: 0 32px;
        }
    }
}
</style>
