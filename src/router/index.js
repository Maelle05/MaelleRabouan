import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Project from "../views/Project.vue";
import Projects from "@/views/Projects.vue";
import About from "@/views/About.vue";
import Lab from "@/views/Lab.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/projects", component: Projects },
  { path: "/projects/:slug", component: Project, props: true },
  { path: "/lab", component: Lab },
  { path: "/about", component: About },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});
