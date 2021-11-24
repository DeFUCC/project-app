import { createApp } from "vue";
import app from "./app.vue";

import { i18n } from "./locales/i18n";
import "./index.css";

import "virtual:windi.css";
import "uno.css";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const projectApp = createApp(app);
projectApp.use(router);
projectApp.use(i18n);
projectApp.mount("#app");
