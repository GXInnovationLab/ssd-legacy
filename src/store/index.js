import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import base from './base';
import biz from './biz';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Store({
  modules: {
    ...base,
    ...biz,
  },
  strict: debug,
});
