import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import { types } from "@/store/types.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUpPage.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("@/views/CoursesPage.vue")
  },
  {
    path: "/edit-course/:courseId",
    name: "EditCourse",
    component: () => import("@/views/EditCoursePage.vue"),
    props: true
  },
  {
    path: "/course/:courseId",
    name: "CourseDetails",
    component: () => import("@/views/CourseDetailsPage.vue"),
    props: true
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthorized = !!store.getters[types.getters.USER_ID];

  if (!to.matched.some(({ meta: { guest } }) => guest) && !isAuthorized) {
    next("/");
    return;
  }

  next();
});

export default router;
