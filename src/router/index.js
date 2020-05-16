import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUpPage.vue")
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("@/views/CoursesPage.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
