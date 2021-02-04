import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import store from "./store/index.js";
import { BootstrapVue } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue);

new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");
