import {createStore} from "vuex";

import {balanceFactory, stratumFactory, userFactory} from "@/utils/factory";

import modal from "./modal";
import notification from "./notification";

export default createStore({
    state: {
        user: userFactory(),
        balance: balanceFactory(),
        stratum: stratumFactory(),
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setBalance(state, balance) {
            state.balance = balance;
        },

        setStratum(state, stratum) {
            state.stratum = stratum;
        },
    },
    modules: {
        modal,
        notification,
    },
    getters: {
        getBalance(state) {
            return state.balance
        }
    }
});
