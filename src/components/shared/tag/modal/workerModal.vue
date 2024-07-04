<template>
    <UIModal class="tag-modal" @close="onClose(false)">
      <div class="tag-modal__content">
        <div class="tags-all">
          <h3>All Tags:</h3>
          <span>(click for add tag on miner)</span>
        </div>
        <span class="tags-content">
          <span v-for="tag of allTags" :key="tag.name" class="tag-container">
            <button class="tag-button tag-button__active" 
              @click="togleTag(tag)">#{{tag.name}}
            </button>
          </span>
        </span>
        <!-- <hr class="custom-hr"> -->
        <div class="tags-all">
          <h3>Miner Tags:</h3>
          <span>(click for remove tag from miner)</span>
        </div>
        <span  class="tags-content">
          <span v-for="tag of minerTags" :key="tag.name" class="tag-container">
            <button class="tag-button tag-button__active" 
              @click="deleteTag(tag)">#{{tag.name}}
            </button>
          </span>
        </span>
        <div class="tag-button-control">
          <UIButton
            class="tag-button-control__save"
            label="Save"
            view="green"
            size="small"
            :disabled="disabled"
            @click="onSave"
          />
          <UIButton
            class="tag-button-control__cancel"
            label="Close"
            view="main"
            size="small"
            @click="onClose(false)"
          />
        </div>
      </div>
    </UIModal>
</template>

<script>
import UIModal from "@/components/ui/modal/modal.vue";
import UIButton from "@/components/ui/button/button.vue";
import UIInput from "@/components/ui/input/input.vue";

import {NOTIFICATIONS} from "@/store/notification";

import Api from "@/api/api";

const api = new Api();

export default {
    name: "WorkerTagModal",
    components: {
        UIModal,
        UIButton,
        UIInput
    },
    props: {
      tags: {
        type: Array,
        default: () => [],
      },
      worker: {
          type: Object,
          required: true,
      },
    },
    data() {
        return {
            loading: false,
            name: null,
            selectTag: null,
            allTags: [],
            minerTags: []
        };
    },
    created () {
      this.getAllTags()
      this.minerTags = [...this.tags]
    },
    computed: {
      disabled() {
        return false
      }
    },
    methods: {
        onClose(forceRefresh) {
            this.$emit("closeMinerTagModal", forceRefresh);
        },

        addTag(tag) {
            this.minerTags.push(tag)
        },

        deleteTag(tag) {
            this.minerTags = this.minerTags.filter(t => t.id !== tag.id)
        },

        togleTag(tag) {
          let tagFind = this.minerTags.find(t => t.id === tag.id)
          if (tagFind) this.deleteTag(tag)
          else this.addTag(tag)
        },

        async getAllTags() {
            await api.getUserTags().then((tags) => {
                this.allTags = tags
            })
        },

        onSave() {
          const params = {
            miner: this.worker, 
            tags: this.minerTags
          }
          api.saveMinerTags(params).then(() => {
            this.onClose(true)
          })
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

.tag-button {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
  font-family: "Golos-Regular", sans-serif;
  align-items: center;
  grid-column-gap: 14px;
  padding: 8px 16px;
  border: 1px solid #eceff0;
  border-radius: 18px;
  font-size: 14px;
  line-height: 16px;
  color: #222327;
}

.tag-container {
  margin-left: 1px;
  margin-right: 1px;
}

.tag-button__active {
  background: #c2fcd2;
  font-weight: 600;
}

.tag-button__disabled {
  background: #f0f0f0;
  color: #555555;
  font-weight: 300;
}

.custom-hr {
  color: black;
  size: 2px;
  width: 100%;
}

.tag-button-control {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    align-self: flex-end;
    padding-left: 20%;
    padding-right: 20%;

    .tag-button-control__save {
        margin: 3px;
    }

    .tag-button-control__cancel {
        margin: 3px;
    }
}

.tags-all {
  h3 {
    text-align: center;
  }

  span {
    text-align: center;
    color: grey;
  }
}

.tags-content {
  margin-top: 14px;
  margin-bottom: 22px;
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
