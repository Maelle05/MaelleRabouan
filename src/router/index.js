import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Project from "../views/Project.vue";
import Projects from "@/views/Projects.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Lab from "@/views/Lab.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/projects", component: Projects },
  { path: "/projects/:slug", component: Project, props: true },
  { path: "/lab", component: Lab },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
