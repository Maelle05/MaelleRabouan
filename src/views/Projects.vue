<script setup>
import { ref, computed } from "vue";
import projectsData from "../data/projects.json";
import FilterBar from "../components/FilterBar.vue";
import ProjectCard from "../components/ProjectCard.vue";

const selectedTag = ref(null);
const projectsPro = projectsData.filter((p) => p.type == "Projets");

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projectsPro;
  return projectsPro.filter((p) => p.tags.includes(selectedTag.value));
});
</script>

<template>
  <div class="container mx-auto">
    <h1>Projects</h1>
    <FilterBar :tags="['Educational', '3D']" v-model="selectedTag" />
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
    </div>
  </div>
</template>
