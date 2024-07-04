<template>
    <div class="tags">
        <div>
          <span v-if="label">{{ label }}</span>
          <span v-for="tag of tags" :key="tag.name" class="tag-container">
            <button class="tag-button" 
              v-bind:class="{ 'tag-button__disabled': !tag.show, 'tag-button__active': tag.show }"
              @click="toggleTag(tag)">#{{tag.name}}
            </button>
          </span>
        </div>
        <UIButton
          v-if="addButton"
          label="Add Tag"
          view="light"
          icon="plusWhite"
          @clicked="openTagModal"
        />
    </div>
</template>

<script>
import UIButton from "@/components/ui/button/button.vue";

export default {
    name: "WorkersTag",
    components: {UIButton},
    props: {
        tags: {
            type: Array,
            default: () => [],
        },
        addButton: {
          type: Boolean,
          default: false
        },
        label: {
          type: String
        }
    },
    data () {
      return {
      }
    },
    methods: {
      toggleTag(tag) {
        tag.show = !tag.show
        this.$emit("selectTag")
      },
      
      openTagModal() {
        this.$emit("openTagModal")
      }
    },
};
</script>

<style lang="scss">
.tags {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

@media screen and (max-width: 768px) {
    .tags {
        padding: 20px 12px 0 12px;
    }
}

</style>
