import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { getInitialState } from "@/store/state";
import { getters } from "@/store/getters";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";

import { STORAGE_KEY } from "@/constants/common";

Vue.use(Vuex);

const state = { ...getInitialState() };

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      key: STORAGE_KEY
    })
  ]
});
