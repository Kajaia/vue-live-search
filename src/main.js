import { createApp } from "vue";
import App from "./App.vue";
import bootstrap from "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.esm";

createApp(App)
  .use(bootstrap)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
