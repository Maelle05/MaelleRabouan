import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Project from "../views/Project.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/projects/:slug", component: Project, props: true },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
