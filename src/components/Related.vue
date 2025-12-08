<script setup>
import { ref, watch } from "vue";
import projects from "../data/projects.json";
import ProjectCard from "../components/ProjectCard.vue";

const props = defineProps({
  dedId: {
    type: String,
    required: true,
  },
});

const copy = ref([]);

// Fonction pour filtrer et mélanger les projets
function shuffleProjects() {
  const projectsRelated = projects.filter((p) => p.id !== props.dedId);
  const arr = [...projectsRelated];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  copy.value = arr;
}

// Initial shuffle
shuffleProjects();

// Watch sur dedId pour relancer le shuffle
watch(
  () => props.dedId,
  () => {
    shuffleProjects();
  }
);
</script>

<template>
  <div class="w-full">
    <h3 class="exerge mt-30 md:mt-30 uppercase mb-2 text-2xl">
      to explore more :
    </h3>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
      <ProjectCard
        v-for="(p, index) in copy.slice(0, 3)"
        :key="p.id"
        :project="p"
      />
    </div>
  </div>
</template>
