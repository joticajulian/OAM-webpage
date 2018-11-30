import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@components/HelloWorld";
/*import Config from '@/config.js'
import Home from '@/components/Home'
import Account from '@/components/Account'
import Post from '@/components/Post'
import Block from '@/components/Block'
import Transaction from '@/components/Transaction'
import Map from '@/components/Map'*/

//steem.api.setOptions(Config.RPC_NODE);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
  //mode: 'history',
});
