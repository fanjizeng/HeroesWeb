import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/style.scss";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import "./assets/icons/iconfont.css";
import axios from "axios";

import Card from "./components/Card";
import ListCard from "./components/ListCard";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3010/web/api"
});
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.component("m-card", Card);
Vue.component("m-list-card", ListCard);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
