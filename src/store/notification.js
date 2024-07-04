export const NOTIFICATIONS = {
    deleteWorker: "deleteWorker",
    registration: "registration",
    default: "",
};

export default {
    namespaced: true,
    state: {
        notification: NOTIFICATIONS.default,
    },
    mutations: {
        setNotification(state, notification) {
            state.notification = notification;
        },
    },
};
