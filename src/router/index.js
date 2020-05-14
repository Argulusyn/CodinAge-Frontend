import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: () => import("@/views/LoginPage.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
