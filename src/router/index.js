import Vue from "vue";
import Router from "vue-router";
import OAMEntryPage from "@/components/OAMEntryPage";

//steem.api.setOptions(Config.RPC_NODE);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "OAMEntryPage",
      component: OAMEntryPage
    }
  ]
});
