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
  <div class="">
    <div
      class="relative w-full h-[calc(100vh-64px)] flex flex-col justify-center items-center"
    >
      <img
        src="../assets/moi.png"
        draggable="false"
        class="w-[150px] rounded-full mb-[15px]"
      />
      <h1 class="exerge text-3xl">MAËLLE RABOUAN</h1>
      <h2 class="text-xl">Creative developer</h2>
      <h3 class="text-xl mb-[120px]">
        Alumnus from
        <a
          href="https://www.gobelins.fr/"
          target="_blank"
          class="relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full"
        >
          Gobelins Paris
        </a>
      </h3>
      <div
        class="absolute bottom-5 uppercase text-sm flex flex-col items-center"
      >
        <span class="floaty-anim">Scroll</span>
        <span class="stretch-anim h-[10px] w-[1.5px] bg-black"></span>
      </div>
    </div>
    <div>
      <FilterBar :tags="['Educational', '3D']" v-model="selectedTag" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.floaty-anim {
  display: inline-block;
  animation: floaty 2s ease-in-out infinite;
}

@keyframes floaty {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.stretch-anim {
  animation: stretch 2s ease-in-out infinite;
}

@keyframes stretch {
  0%,
  100% {
    transform: scaleX(1) scaleY(1);
  }
  50% {
    transform: scaleX(0.8) scaleY(1.5) translateY(-2px);
  }
}
</style>
