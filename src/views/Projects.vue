<script setup>
import { ref, computed } from "vue";
import projectsData from "../data/projects.json";
import FilterBar from "../components/FilterBar.vue";
import ProjectCard from "../components/ProjectCard.vue";
import Btn from "@/components/Btn.vue";

const selectedTag = ref(null);
const projectsPro = projectsData.filter((p) => p.type == "Projets");

const projectsProTags = [];
projectsPro.forEach((proj) => {
  proj.tags.forEach((tag) => {
    if (projectsProTags.includes(tag) == false) projectsProTags.push(tag);
  });
});

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projectsPro;
  return projectsPro.filter((p) => p.tags.includes(selectedTag.value));
});
</script>

<template>
  <div class="container mx-auto">
    <div class="mt-20 mb-10 flex flex-col items-center">
      <h1 class="exerge text-4xl">Projects</h1>
    </div>
    <FilterBar :tags="projectsProTags" v-model="selectedTag" />
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
    </div>
    <Btn title="Take a look at my lab" src="/lab" />
  </div>
</template>
x
