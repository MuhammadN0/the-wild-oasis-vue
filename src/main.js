import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import validation from "./plugins/validation";
import { auth } from "./firebase/config";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(validation);
    app.use(router);
    app.mount("#app");
  }
});
