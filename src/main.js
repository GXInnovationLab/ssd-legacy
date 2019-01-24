// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import VueCookie from 'vue-cookie';

import moment from 'moment';

import 'web-base-css/dist/index.css';

import ElementUI, { Message } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './asset/style/index.css';

import App from './App';
import store from './store';
import router from './router';

Vue.prototype.$moment = moment;

// 智能提示条
const $smartMessage = (text) => {
  const duration = Math.max(text.length * 160, 2000);
  Message({
    center: true,
    message: text,
    duration,
  });
};
['success', 'warning', 'error'].forEach((el) => {
  $smartMessage[el] = (params) => {
    if (typeof params === 'string') {
      const duration = Math.max(params.length * 160, 2000);
      Message[el]({
        center: true,
        message: params,
        duration,
        showClose: duration > 8000,
      });
    } else if (typeof params === 'object') {
      const message = params.message || '';
      const duration = Math.max(message.length * 160, 2000);
      Message[el]({
        ...params,
        center: true,
        duration,
        showClose: duration > 8000,
      });
    } else {
      Message[el](params);
    }
  };
});
Vue.prototype.$smartMessage = $smartMessage;

Vue.config.productionTip = false;

Vue.use(VueCookie);
Vue.use(ElementUI);

/**
 * 全局事件总线
 * 触发事件: EventBus.$emit('emitEventName', data)
 * 监听时间: EventBus.$on('eventName', function(data){})
 * */
window.EventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
});
