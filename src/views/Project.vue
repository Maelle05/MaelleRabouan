<script setup>
import { useRoute } from "vue-router";
import projects from "../data/projects.json";

const route = useRoute();
const project = projects.find((p) => p.slug === route.params.slug);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- <img :src="project.cover" :alt="project.title" class="rounded-2xl mb-4" /> -->
    <video
      :src="'../' + project.cover"
      :alt="project.title"
      muted
      autoplay
      loop
      playsinline
      class="rounded-2xl mb-4"
    ></video>
    <h1 class="text-3xl font-bold mb-2">{{ project.title }}</h1>
    <div class="flex gap-2 mb-4">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="border text-sm px-2 py-1 rounded"
        >{{ tag }}</span
      >
    </div>
    <p class="text-gray-700 mb-6">{{ project.content }}</p>
    <a
      v-if="project.link"
      :href="project.link"
      target="_blank"
      class="text-blue-600 underline"
      >Voir le projet</a
    >
  </div>
</template>
