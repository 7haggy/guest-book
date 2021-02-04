import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeUser: null,
        users: [
            { login: "admin", pass: "admin", isAdmin: true, },
            { login: "user", pass: "user", isAdmin: false, },
        ],
    },
    mutations: {
        registration(state, user) {
            state.users.push(user);
            state.activeUser = user;
        },
        updateActiveUser(state, user) {
            state.activeUser = user;
        },
    },
});
