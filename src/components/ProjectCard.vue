<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

function goToProject() {
  router.push(`/projects/${props.project.slug}`);
}
</script>

<template>
  <div
    @click="goToProject"
    class="group cursor-pointer bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden"
  >
    <div class="overflow-hidden">
      <!-- <img
        :src="project.cover"
        :alt="project.title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      /> -->
      <video
        :src="project.cover"
        :alt="project.title"
        muted
        autoplay
        loop
        playsinline
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      ></video>
    </div>

    <div class="p-4">
      <h2
        class="text-lg font-semibold mb-2 group-hover:text-indigo-500 transition-colors"
      >
        {{ project.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
