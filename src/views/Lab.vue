<script setup>
import { ref, computed } from "vue";
import projectsData from "../data/projects.json";
import FilterBar from "../components/FilterBar.vue";
import ProjectCard from "../components/ProjectCard.vue";

const selectedTag = ref(null);
const projectsLab = projectsData.filter((p) => p.type == "Lab");

const projectsLabTags = [];
projectsLab.forEach((proj) => {
  proj.tags.forEach((tag) => {
    if (projectsLabTags.includes(tag) == false) projectsLabTags.push(tag);
  });
});

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projectsLab;
  return projectsLab.filter((p) => p.tags.includes(selectedTag.value));
});
</script>

<template>
  <div class="container mx-auto">
    <div class="mt-20 mb-10 flex flex-col items-center">
      <h1 class="exerge text-4xl mb-2">Lab</h1>
      <p>Trying things, breaking things, and pushing ideas.</p>
    </div>
    <FilterBar :tags="projectsLabTags" v-model="selectedTag" />
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
    </div>
  </div>
</template>
