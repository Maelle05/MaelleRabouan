<script setup>
import { ref, computed } from "vue";
import projectsData from "../data/projects.json";
import FilterBar from "../components/FilterBar.vue";
import ProjectCard from "../components/ProjectCard.vue";

const selectedTag = ref(null);

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projectsData;
  return projectsData.filter((p) => p.tags.includes(selectedTag.value));
});
</script>

<template>
  <div class="p-6">
    <h1>Contact</h1>
  </div>
</template>
