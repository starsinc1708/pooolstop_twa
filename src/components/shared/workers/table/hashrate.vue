<template>
    <div>
        <div class="workers-table-hashrate">
            <UIInfo
                class="workers-table-hashrate__info"
                v-show="getInfoIsShow"
                position="left"
            >
                <div class="workers-table-hashrate__info-list">
                    <div
                        class="workers-table-hashrate__info-item"
                        v-for="item in getInfoList"
                        :key="item.id"
                    >
                        <p class="workers-table-hashrate__info-label">
                            {{ item.label }}
                        </p>

                        <p class="workers-table-hashrate__info-label">
                            {{ item.value }}
                        </p>
                    </div>
                </div>
            </UIInfo>

            <p class="workers-table-hashrate__label">
                {{ worker.name }}

                <span
                    class="workers-table-hashrate__nominal"
                    v-if="getNominalIsShow"
                >
                    ({{ worker.nominal }} Th)
                </span>
            </p>

            <UIHashrate
                class="workers-table-hashrate__hashrate"
                v-if="getHashrateIsShow"
                :toggle="toggle"
                :disabled="getDisabled"
                @toggle="onToggle"
                @hashrate="onHashrate"
            />

            <button
                class="workers-table-hashrate__edit"
                v-if="getEditIsShow"
                @click="onEdit"
            >
                <UISvg class="workers-table-hasrate__edit-icon" icon="edit" />
            </button>
        </div>
        <div>
            <span v-for="tag of getTags" :key="tag.id" class="tag-container">
                <button class="tag-miner-button" disabled>
                    #{{tag.name}}
                </button>
            </span>
        </div>
    </div>
</template>

<script>
import UISvg from "@/components/ui/svg/svg.vue";
import UIHashrate from "@/components/ui/hashrate/hashrate.vue";
import UIInfo from "@/components/ui/info/info.vue";

import {getDate} from "@/utils/functions.js";

import Api from "@/api/api.js";

const api = new Api();

export default {
    name: "WorkersTableHashrate",
    components: {
        UISvg,
        UIHashrate,
        UIInfo,
    },
    props: {
        worker: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            toggle: false,
            loading: false,
            edit: false,
        };
    },
    computed: {
        getTags() {
            return this.worker.tags
        },
        getNominalIsShow() {
            const {nominal} = this.worker;

            return nominal;
        },

        getHashrateIsShow() {
            const {nominal} = this.worker;

            return !nominal || this.edit;
        },

        getInfoIsShow() {
            return !this.toggle;
        },

        getDisabled() {
            return this.loading;
        },

        getEditIsShow() {
            const {nominal} = this.worker;

            return !this.edit && nominal;
        },

        getInfoList() {
            const {created, inetAddress, info, timeLastShare} = this.worker;

            return [
                {
                    id: 0,
                    label: "Connected:",
                    value: getDate(created, "hh:mm:ss DD.MM.YYYY"),
                },
                {
                    id: 1,
                    label: "IP address:",
                    value: inetAddress,
                },
                {
                    id: 2,
                    label: "Info:",
                    value: info,
                },
                {
                    id: 3,
                    label: "Last Share:",
                    value: getDate(timeLastShare, "hh:mm:ss DD.MM.YYYY"),
                },
            ];
        },
    },
    methods: {
        onToggle(toggle) {
            this.toggle = toggle;

            if (!toggle) {
                this.edit = false;
            }
        },

        async onHashrate(hashrate) {
            try {
                this.loading = true;

                await api
                    .nominal({
                        id: this.worker.id,
                        nominal: hashrate,
                    })
                    .then(async () => {
                        await api.workers().then((workers) => {
                            this.$emit("workers", workers);

                            this.loading = false;
                            this.toggle = false;
                            this.edit = false;
                        });
                    });
            } catch (e) {
                this.loading = false;
                this.toggle = false;
            }
        },

        onEdit() {
            this.toggle = true;
            this.edit = true;
        },
    },
};
</script>

<style lang="scss">
.workers-table-hashrate {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 12px;

    .workers-table-hashrate__edit {
        @include button-reset;
        margin-left: 4px;
    }

    .workers-table-hasrate__edit-icon {
        fill: $txt-light;
    }

    .workers-table-hashrate__label {
        font-size: 14px;
        line-height: 17px;
        color: $txt-main;
        white-space: nowrap;
    }

    .workers-table-hashrate__nominal {
        color: $txt-light;
    }

    .workers-table-hashrate__hashrate {
        margin-left: 6px;
    }

    .workers-table-hashrate__info {
        margin-right: 7px;
    }

    .workers-table-hashrate__info-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .workers-table-hashrate__info-label {
        font-size: 12px;
        line-height: 20px;
        color: $white;
    }
}

.tag-container {
  margin-left: 1px;
  margin-right: 1px;
}

.tag-miner-button {
  border: none;
  outline: none;
  padding: 0;
  transition: all 0.3s;
  font-family: "Golos-Regular", sans-serif;
  align-items: center;
  grid-column-gap: 14px;
  padding: 4px 8px;
  border: 1px solid #eceff0;
  border-radius: 18px;
  font-size: 12px;
  line-height: 12px;
  color: #222327;
  background: #c2fcd2;
}

@media screen and (max-width: 1024px) {
    .workers-table-hashrate {
        .workers-table-hashrate__hashrate {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .workers-table-hashrate {
        padding: 0 8px;

        .workers-table-hashrate__nominal {
            display: none;
        }
    }
}
</style>
