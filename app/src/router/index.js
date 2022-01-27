import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/end",
    name: "End",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "end" */ "../views/End.vue"),
  },
  {
    path: "/game",
    name: "Game",
    component: () => import(/* webpackChunkName: "end" */ "../views/Game.vue"),
  },
  {
    path: "/plant/:id",
    name: "Plant",
    component: () => import(/* webpackChunkName: "end" */ "../views/Plant.vue"),
  },  {
    path: "/plants",
    name: "Plants",
    component: () => import(/* webpackChunkName: "end" */ "../views/Plants.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
