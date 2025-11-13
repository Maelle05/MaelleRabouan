<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import Media from "./Media.vue";

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
  <div @click="goToProject" class="group cursor-pointer overflow-hidden">
    <Media
      :src="project.cover"
      :title="project.title"
      added-class="group-hover:scale-95 transition-transform duration-300"
    />
    <div class="py-4">
      <h2 class="exerge text-lg font-semibold mb-2">
        {{ project.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {{ project.description }}
      </p>
      <p
        class="relative after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:w-full max-w-max"
      >
        learn more
      </p>
    </div>
  </div>
</template>

<style scoped></style>
