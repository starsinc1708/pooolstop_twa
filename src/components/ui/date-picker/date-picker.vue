<template>
    <div class="ui-date-picker" :class="getViewClass">
        <VueDatePicker
            range
            multi-calendars
            :format="getFormat"
            v-model="currentValue"
            placeholder="Select Date"
            :enable-time-picker="false"
            menu-class-name="ui-date-picker__menu"
            :input-class-name="getFieldViewClass"
            :time="false"
            :disabled="disabled"
            :max-date="new Date()"
        >
            <template #action-row="{selectDate}">
                <div class="action-row">
                    <UIButton
                        label="Select"
                        view="main"
                        size="small"
                        @clicked="selectDate"
                    />
                </div>
            </template>
        </VueDatePicker>
    </div>
</template>

<script>
import moment from "moment";

import VueDatePicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";

import UIButton from "@/components/ui/button/button.vue";

const VIEWS = {
    default: "",
    active: "ui-date-picker--active",
};

const FIELD_VIEWS = {
    default: "ui-date-picker__field",
    active: "ui-date-picker__field--active",
};

const FORMATS = {
    "dd.mm.yyyy": "DD.MM.YYYY",
};

export default {
    name: "UIDatePicker",
    components: {
        VueDatePicker,
        UIButton,
    },
    props: {
        placeholder: {
            type: String,
            default: "",
        },
        value: {
            type: Array,
            default: () => [],
        },
        format: {
            type: String,
            default: "dd.mm.yyyy",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            date: null,

        };
    },
    computed: {
        getViewClass() {
            return this.value.length ? VIEWS.active : VIEWS.default;
        },

        getFieldViewClass() {
            const classes = [FIELD_VIEWS.default];

            if (this.value.length) {
                classes.push(FIELD_VIEWS.active);
            }

            return classes.join(" ");
        },

        currentValue: {
            get() {
                if (this.value.length) {
                    const [fromDate, toDate] = this.value;

                    return [
                        moment(fromDate, FORMATS[this.format]),
                        moment(toDate, FORMATS[this.format]),
                    ];
                }

                return this.value;
            },

            set(value) {
                if (value) {
                    const [fromDate, toDate] = value;

                    this.$emit(
                        "changed",
                        value
                            ? [
                                  moment(fromDate).format(FORMATS[this.format]),
                                  moment(toDate).format(FORMATS[this.format]),
                              ]
                            : []
                    );
                } else {
                    this.$emit("changed", []);
                }
            },
        },
    },

    methods: {
        getFormat(dates) {
            return moment(dates[0]).format(FORMATS[this.format]) + ' - ' + moment(dates[1]).format(FORMATS[this.format])
        }
    },
};
</script>

<style lang="scss">
.ui-date-picker {
    max-width: 153px;

    &.ui-date-picker--active {
        max-width: 100%;
    }

    .ui-date-picker__field {
        @include golos-regular;
        padding: 10px 22px 10px 48px;
        background: $gray-100;
        border-radius: 10px;
        border: 1px solid transparent;
        transition: $transition;
        font-size: 14px;
        line-height: 16px;
        color: $txt-main;

        &::placeholder {
            opacity: 1;
        }
    }

    .ui-date-picker__field--active {
        padding-right: 40px;
    }

    .ui-date-picker__menu {
        box-shadow: 0px 10px 20px rgba(27, 90, 134, 0.2);
        border: none;
        border-radius: 10px;
        padding: 10px;
    }

    .dp__input_wrap {
        &:hover {
            .dp__input_icon {
                fill: $main;
                stroke: $main;
            }

            .ui-date-picker__field {
                border-color: $main;
            }
        }
    }

    .dp__icon {
        fill: $txt-light;
        stroke: $txt-light;
        width: 18px;
        height: 18px;
        padding: 0;
        transition: $transition;
    }

    .dp__input_icon {
        left: 18px;
    }

    .dp__clear_icon {
        right: 10px;
    }

    .dp__selection_preview {
        display: none;
    }

    .dp__calendar_header_item {
        @include golos-regular;
        font-weight: normal;
        color: $txt-light;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dp__cell_inner {
        @include golos-regular;
        font-size: 14px;
        font-weight: normal;
        color: $txt-main;
        transition: $transition;
    }

    .dp__cell_offset {
        color: $txt-light;
    }

    .dp__today {
        border: 1px solid $main;
    }

    .dp__range_start,
    .dp__range_end {
        color: $white;
        background: $main;
    }

    .dp__range_between {
        background: $bg-light;
    }

    .dp__date_hover_start,
    .dp__date_hover_end {
        &:hover {
            background: $bg-light;
        }
    }

    .dp__calendar_header_separator {
        display: none;
    }

    .dp__calendar_header {
        border: 1px solid #edf0f1;
        border-right: none;
        border-left: none;
    }

    .dp__month_year_row {
        margin-bottom: 15px;
    }

    .dp__month_year_select {
        @include golos-regular;
        transition: $transition;
        color: rgba(34, 35, 39, 0.7);
        border-radius: 10px;

        &:hover {
            color: $txt-main;
            background: $bg-light;
        }
    }

    .dp__action_row {
        justify-content: flex-end;
        padding-right: 0;
    }

    .dp__action_buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-column-gap: 10px;
    }

    .dp__action {
        @include golos-regular;
        font-weight: normal;
    }

    .dp__overlay_cell {
        @include golos-regular;
        transition: $transition;
        color: rgba(34, 35, 39, 0.7);
        border-radius: 10px;

        &:hover {
            color: $txt-main;
            background: $bg-light;
        }
    }

    .dp__overlay_cell_active {
        @include golos-regular;
        background: $main;
        border-radius: 10px;
        color: $white;
    }

    .dp__icon {
        transition: $transition;
    }

    .dp__overlay_action {
        transition: $transition;
        border-radius: 10px;
        width: 100px;
        margin: 0 auto;

        &:hover {
            color: $txt-main;
            background: $bg-light;

            .dp__icon {
                fill: $txt-main;
                stroke: $txt-main;
            }
        }
    }

    .dp__inner_nav {
        transition: $transition;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: $bg-light;

            .dp__icon {
                fill: $txt-main;
                stroke: $txt-main;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .ui-date-picker {
        max-width: 42px;

        .ui-date-picker__field {
            padding: 8px 11px;

            &::placeholder {
                color: transparent;
            }
        }

        .dp__input_icon {
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
