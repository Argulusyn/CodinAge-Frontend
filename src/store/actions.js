import { loginUser } from "@/api/authentication.js";
import { types } from "@/store/types";

export const actions = {
  async [types.actions.LOGIN]({ commit }, loginData) {
    const { data: userDetails } = await loginUser(loginData);
    commit(types.mutations.SET_USER, userDetails);
  }
};
