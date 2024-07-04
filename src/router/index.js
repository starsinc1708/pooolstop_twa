import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "@/views/dashboard/dashboard.vue";
import Workers from "@/views/workers/workers.vue";
import Wallet from "@/views/wallet/wallet.vue";
import Rating from "@/views/rating/rating.vue";
import Settings from "@/views/settings/settings.vue";
import Login from "@/views/login/login.vue";
import Registration from "@/views/registration/registration.vue";
import RestorePassword from "@/views/restore-password/restore-password.vue";
import Api from "@/api/api";
import {useTelegram} from "@/utils/useTelegram";

const api = new Api();
import {getCookie, removeCookie, setCookie} from "@/utils/functions";
import {RESPONSE_STATUSES} from "@/utils/constants";

const { user } = useTelegram();

const BACKGROUNDS = {
    default: "#ECF6FC",
    main: "#36a1ea",
};

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: Dashboard,
        meta: {
            layout: "default",
            auth: true,
            background: BACKGROUNDS.default,
        },
    },
    {
        path: "/workers",
        name: "workers",
        component: Workers,
        meta: {
            layout: "default",
            auth: true,
            background: BACKGROUNDS.default,
        },
    },
    {
        path: "/wallet",
        name: "wallet",
        component: Wallet,
        meta: {
            layout: "default",
            auth: true,
            background: BACKGROUNDS.default,
        },
    },
    {
        path: "/rating",
        name: "rating",
        component: Rating,
        meta: {
            layout: "default",
            auth: true,
            background: BACKGROUNDS.default,
        },
    },
    {
        path: "/settings",
        name: "settings",
        component: Settings,
        meta: {
            layout: "default",
            auth: true,
            background: BACKGROUNDS.default,
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            layout: "authorization",
            background: BACKGROUNDS.main,
        },
    },
    {
        path: "/registration",
        name: "registration",
        component: Registration,
        meta: {
            layout: "authorization",
            background: BACKGROUNDS.main,
        },
    },
    {
        path: "/restore-password",
        name: "restore-password",
        component: RestorePassword,
        meta: {
            layout: "authorization",
            background: BACKGROUNDS.main,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
        const loggedIn = await getLogged();
        if (loggedIn) {
            next();
        } else {
            next({ path: "/login" });
        }
    } else if ((to.name === "login" || to.name === "registration") && await getLogged()) {
        next({ path: "/" });
    } else {
        next();
    }
});

async function getLogged() {
    if (user) {
        try {
            const response = await api.checkTelegramUserSynced(user);
            const { data, status } = response;
            if (status === RESPONSE_STATUSES.not_found) {
                removeCookie("accessToken")
                removeCookie("refreshToken")
                return false;
            }
            if (status !== RESPONSE_STATUSES.error) {
                const { accessToken, refreshToken, tg_id } = data;
                if (tg_id === user.id) {
                    setCookie("accessToken", accessToken, "30d");
                    setCookie("refreshToken", refreshToken, "30d");
                    return true;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    return getCookie("accessToken") && getCookie("refreshToken");
}

export default router;
