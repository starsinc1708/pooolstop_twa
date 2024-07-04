import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueTelegram from 'vue-tg'
import "@/assets/styles/main.scss";

import ClickOutside from "click-outside-vue3";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    BarElement,
    Legend,
} from "chart.js";

import AnnotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    BarElement,
    Legend,
    AnnotationPlugin
);

createApp(App).use(store).use(router).use(ClickOutside).use(VueTelegram).mount("#app");
