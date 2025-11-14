<script setup>
import { useRoute } from "vue-router";
import projects from "../data/projects.json";
import Media from "@/components/Media.vue";

const route = useRoute();
const project = projects.find((p) => p.slug === route.params.slug);
</script>

<template>
  <div class="container mx-auto p-6 mt-20">
    <h1 v-if="project.title" class="text-6xl exerge text-center font-bold mb-2">
      {{ project.title }}
    </h1>
    <p v-if="project.subtitle" class="text-center">{{ project.subtitle }}</p>
    <div
      class="my-14 w-full flex flex-col sm:flex-row gap-5 justify-between border-t-1 border-b-1 py-8"
    >
      <div v-if="project.client">
        <h3 class="exerge uppercase mb-2">Client</h3>
        <a
          :href="project.client_link"
          target="_blank"
          class="relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full"
          ><p>{{ project.client }}</p></a
        >
      </div>
      <div v-if="project.year">
        <h3 class="exerge uppercase mb-2">Date</h3>
        <p>{{ project.year }}</p>
      </div>
      <div v-if="project.category">
        <h3 class="exerge uppercase mb-2">Category</h3>
        <p>{{ project.category }}</p>
      </div>
      <div v-if="project.link">
        <h3 class="exerge uppercase mb-2">Link</h3>
        <a
          :href="project.link"
          target="_blank"
          class="relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full"
          >Visit Website</a
        >
      </div>
    </div>
    <div class="flex flex-col items-center">
      <p class="mb-10">{{ project.description }}</p>

      <div class="max-w-[960px]">
        <Media :src="'../' + project.cover" :title="project.title" />
      </div>
      <div>
        <p v-if="project.content" class="my-6">{{ project.content }}</p>
      </div>
      <div class="max-w-[960px] flex flex-col items-center gap-5">
        <Media
          v-for="v in project.visuals"
          :key="v.id"
          :src="'../' + v"
          :title="project.title"
        />
      </div>
      <div
        class="mt-20 w-full flex flex-col md:flex-row gap-10 justify-between"
      >
        <div>
          <h3 class="exerge uppercase mb-2">My contributions</h3>
          <div v-if="project.contributions != []" class="flex flex-col gap-1">
            <span
              v-for="item in project.contributions"
              :key="item"
              class="text-sm"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="max-w-[200px]">
          <h3 class="exerge uppercase mb-2 md:text-right">Stack</h3>
          <div v-if="project.stack != []" class="flex flex-wrap gap-2">
            <span
              v-for="stack in project.stack"
              :key="stack"
              class="border text-sm px-2 py-1 rounded"
              >{{ stack }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
