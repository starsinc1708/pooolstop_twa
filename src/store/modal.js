export const MODALS = {
    device: "device",
    introduction: "introduction",
    terms: "terms",
    menu: "menu",
    default: "",
};

export default {
    namespaced: true,
    state: {
        modal: MODALS.default,
    },
    mutations: {
        setModal(state, modal) {
            state.modal = modal;
        },
    },
};
