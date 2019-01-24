/*
 * @File: 权限数据
 * @wiki:
 * @Author: mingyan.yu
 * @Date: 2018-04-29 16:25:49
*/

/* eslint-disable no-shadow */

const state = {
  menu: [],
  meta_list: [],
  meta_map: new Map(),
};

const mutations = {
  SET_MENU(state, payload) {
    state.menu = payload;
  },

  SET_META(state, payload) {
    state.meta_list = payload;

    const map = new Map();
    payload.forEach((item) => {
      map.set(item.path, item.name);
    });

    state.meta_map = map;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

