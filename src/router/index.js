import Vue from 'vue';
import Router from 'vue-router';

import autoRoute from 'spa-auto-route';

import {
  ROUTER_PREFIX,
} from '@/config';

import {
  NotFound,
  Forbidden,
} from '@/view/Exception';

Vue.use(Router);
const routes = autoRoute(require.context('@/view', true, /index\.vue$/), /Exception|\/component\//);
export default new Router({
  mode: 'history',
  base: ROUTER_PREFIX,
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: Forbidden,
    },
    {
      path: '/',
      redirect: 'anotherchannel/demopage',
    },
    // 以先接收到的为准，因此自动化路由放在最后，用户配置的放在之前
    ...routes,
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        selector: to.hash,
      };
    }

    return {
      x: 0,
      y: 0,
    };
  },
});
