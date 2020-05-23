import { types } from "@/store/types";

export const mutations = {
  [types.mutations.SET_USER](state, userData) {
    state[types.state.USER] = userData;
  }
};
