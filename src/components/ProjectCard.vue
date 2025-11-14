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
      added-class="group-hover:scale-95 transition-transform duration-300 aspect-[496/306]"
    />
    <div
      class="relative py-4 group-hover:translate-x-10 transition-transform duration-300 before:transition-all before:delay-100 before:duration-400 before:h-0 before:w-[1px] before:mt-[21px] before:absolute before:opacity-0 before:-start-7 before:top-0 before:bg-black group-hover:before:opacity-50 group-hover:before:h-[70%]"
    >
      <h2 class="exerge text-lg font-semibold">
        {{ project.title }}
      </h2>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ project.card_description }}
      </p>
      <p
        class="relative before:absolute before:left-0 before:bottom-0 before:h-[1.5px] before:bg-black before:w-[calc(100%+15px)] max-w-max after:absolute after:border-t-3 after:border-t-transparent after:border-b-3 after:border-b-transparent after:border-l-6 after:border-l-black after:w-0 after:h-0 after:mt-[9px] after:ml-[8px]"
      >
        learn more
      </p>
    </div>
  </div>
</template>

<style scoped></style>
