import axios from "axios";

import http from "@/api/http.js";
import { PAGE_SIZE } from "@/utils/constants.js";
import { getCookie } from "@/utils/functions";

const AUTH_API_URL = "https://localhost:8003";

export default class Api {
    // AUTHORIZATION
    async login(form) {
        const { data } = await http.post("/auth/login", form);
        return data;
    }

    async refresh(refreshToken) {
        const { data } = await http.post("/auth/refresh", { refreshToken });
        return data;
    }

    async syncTelegramUser(user, email) {
        const user_info = {
            tg_id: user.id,
            username: user.username,
            firstName: user.first_name,
            secondName: user.last_name,
            email: email,
            accessToken: getCookie("accessToken"),
            refreshToken: getCookie("refreshToken"),
        };

        await axios.post(AUTH_API_URL + "/api/create/tgsync", user_info);
    }

    async checkTelegramUserSynced(user) {
        const user_info = {
            tg_id: user.id,
        };
        const { data } = await axios.post(
            AUTH_API_URL + "/api/tgsync",
            user_info
        );
        return data;
    }

    async deleteUserSync(user) {
        const user_info = {
            tg_id: user.id,
        };
        await axios.post(AUTH_API_URL + "/api/delete/tgsync", user_info);
    }

    // REGISTRATION
    async registration(form) {
        const { data } = await http.post("/reg", form);
        return data;
    }

    async verifyByCode(params) {
        const { data } = await http.post("/reg/verify", params);
        return data;
    }

    async emailValidation(email) {
        const { data } = await http.post("/reg/valid/email", { email });
        return data;
    }

    async accountValidate(account) {
        const { data } = await http.post("/reg/valid/account", { account });
        return data;
    }

    // DASHBOARD
    async dashboard(params) {
        const { data } = await http.post("/dashboard", params);
        return data.data;
    }

    async incomes(page, period, tagIds) {
        const params = {
            page,
            size: PAGE_SIZE,
            start: "",
            end: "",
            tagIds: [],
        };
        if (tagIds != null && tagIds.length > 0) {
            params["tagIds"] = tagIds;
        }
        if (period && period.length === 2) {
            params["start"] = period[0];
            params["end"] = period[1];
        }
        const { data } = await http.post("/dashboard/income", params);

        return data.data;
    }

    async download(params) {
        const { data } = await http.post("/download/income", params, {
            responseType: "blob",
        });
        return data;
    }

    async tags() {
        const { data } = await http.get("/dashboard/tags");

        return data.data;
    }

    // MINERS
    async workers() {
        const { data } = await http.get("/miners");

        return data.data;
    }

    async stat(id, params) {
        const { data } = await http.post("/miners/stat", {
            id,
            ...params,
        });

        return data.data;
    }

    async nominal(params) {
        const { data } = await http.post("/miners/nominal", params);

        return data.data;
    }

    async getNominal(params) {
        const { data } = await http.post("/miners/getnominal", params);

        return data;
    }

    async deleteMiner(params) {
        const { data } = await http.post("/miners/delete", params);

        return data.data;
    }

    async saveMinerTags(params) {
        const { data } = await http.post("/miners/tag/save", params);

        return data.data;
    }

    // USERS
    async getUserTags() {
        const { data } = await http.get("/users/tags");

        return data.data;
    }

    async addUserTag(params) {
        const { data } = await http.post("/users/tag/add", params);

        return data.data;
    }

    async deleteUserTag(params) {
        const { data } = await http.post("/users/tag/delete", params);

        return data.data;
    }

    async user() {
        const { data } = await http.get("/users/current");

        return data.data;
    }

    async stratum() {
        const { data } = await http.get("/users/stratum");

        return data.data;
    }

    async resetPassword(email) {
        const { data } = await http.post("/users/resetPassword", {
            email,
        });

        return data;
    }

    async changePassword(params) {
        const { data } = await http.post("/users/changePassword", params);

        return data;
    }

    // BALANCE
    async balance() {
        const { data } = await http.get("/balance");

        return data.data;
    }

    // RATING
    async rating(p) {
        const data = await axios.get("https://poools.top/api/rank/top", {
            params: {
                p,
                u: "th",
            },
        });

        return data.data;
    }

    // WALLET
    async wallet() {
        const { data } = await http.get("/wallet");

        return data.data;
    }

    async network(asset) {
        const { data } = await http.get(`/wallet/network/${asset}`);

        return data.data;
    }

    async transactions(page) {
        const { data } = await http.get("/wallet/transactions", {
            params: {
                page,
                size: PAGE_SIZE,
            },
        });

        return data.data;
    }

    async deposit(asset, network) {
        const { data } = await http.post("/wallet/deposit", {
            asset,
            network,
        });

        return data.data;
    }

    async withdraw(params) {
        const { data } = await http.post("/wallet/withdraw", params);

        return data.data;
    }

    async withdrawConfirm(params) {
        const { data } = await http.post("/wallet/withdraw/confirm", params);

        return data;
    }

    async convert(params) {
        const { data } = await http.post("/wallet/convert", params);

        return data.data;
    }

    async pair(params) {
        const { data } = await http.post("/wallet/pair", params);

        return data.data;
    }
}
