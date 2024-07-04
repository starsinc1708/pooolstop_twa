import axios from "axios";

import router from "@/router";

import { getCookie, removeCookie, setCookie } from "@/utils/functions";
import { RESPONSE_STATUSES } from "@/utils/constants";

const DOMAIN = "https://lk.poools.top/";
const API_URL = DOMAIN + "api/v1";

const http = axios.create({
    baseURL: API_URL,
});

http.interceptors.request.use((config) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

http.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const request = error.config;

        if (
            error.response.status === RESPONSE_STATUSES.auth &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                request._isRetry = true;

                let cookieRefreshToken = getCookie("refreshToken");
                if (!cookieRefreshToken) {
                    router.push("/login");
                } else {
                    await axios
                        .post(`${API_URL}/auth/refresh`, {
                            refreshToken: cookieRefreshToken,
                        })
                        .then((response) => {
                            const { data, status } = response.data;

                            if (status === RESPONSE_STATUSES.error) {
                                removeCookie("accessToken");
                                removeCookie("refreshToken");

                                router.push("/login");
                            } else {
                                const { accessToken, refreshToken } = data;

                                setCookie("accessToken", accessToken, "30d");
                                setCookie("refreshToken", refreshToken, "30d");
                            }
                        });
                }
                return http.request(request);
            } catch (e) {
                removeCookie("accessToken");
                removeCookie("refreshToken");

                router.push("/login");
            }
        }

        throw error;
    }
);

export default http;
