import { types } from "@/store/types.js";

export const getters = {
  [types.getters.USER_ID]({ user }) {
    return user && user.id;
  },

  [types.getters.USER_ROLE]({ user }) {
    return user && user.role;
  }
};
