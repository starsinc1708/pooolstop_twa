<template>
    <div class="dashboard-income-difficulty">
        <div
            class="dashboard-income-difficulty__content"
            :class="difficulty.view"
        >
            Difficulty:

            {{ getDifficulty }}
        </div>
    </div>
</template>

<script>
export const CONTENT_VIEWS = {
    red: "dashboard-income-difficulty__content--red",
    green: "dashboard-income-difficulty__content--green",
};

export default {
    name: "DashboardIncomeDifficulty",
    props: {
        difficulty: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getDifficulty() {
            const {difficulty} = this.difficulty;

            return `${difficulty}%`;
        },
    },
};
</script>

<style lang="scss">
.dashboard-income-difficulty {
    .dashboard-income-difficulty__content {
        @include golos-regular;
        position: relative;
        border-radius: 4px;
        font-weight: 400;
        font-size: 11px;
        line-height: 14px;
        padding: 2px 12px;
        white-space: nowrap;

        &::before {
            position: absolute;
            content: "";
            top: 50%;
            left: -59px;
            height: 1px;
            width: 59px;
            transform: rotate(-180deg);
        }

        &::after {
            position: absolute;
            content: "";
            top: 50%;
            right: -59px;
            height: 1px;
            width: 59px;
        }
    }

    .dashboard-income-difficulty__content--red {
        background: rgba(248, 110, 110, 0.15);
        color: #f86e6e;

        &::before {
            background: linear-gradient(
                90deg,
                rgba(248, 110, 110, 0.4) -42.37%,
                rgba(248, 110, 110, 0) 77.01%
            );
        }

        &::after {
            background: linear-gradient(
                90deg,
                rgba(248, 110, 110, 0.4) -42.37%,
                rgba(248, 110, 110, 0) 77.01%
            );
        }
    }

    .dashboard-income-difficulty__content--green {
        background: rgba(81, 188, 64, 0.15);
        color: $green;

        &::before {
            background: linear-gradient(
                90deg,
                rgba(81, 188, 64, 0.4) 0%,
                rgba(81, 188, 64, 0) 83.85%
            );
        }

        &::after {
            background: linear-gradient(
                90deg,
                rgba(81, 188, 64, 0.4) 0%,
                rgba(81, 188, 64, 0) 83.85%
            );
        }
    }
}
</style>
