<script setup>
import { useRoute } from "vue-router";
import projects from "../data/projects.json";
import Media from "@/components/Media.vue";
import BigLink from "@/components/BigLink.vue";
import Link from "@/components/Link.vue";
import Related from "@/components/Related.vue";
import { ref, watch } from "vue";

const route = useRoute();
const project = ref(null);

function loadProject() {
  project.value = projects.find((p) => p.slug === route.params.slug);
}

loadProject();

watch(
  () => route.params.slug,
  () => {
    loadProject();
  }
);
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
        <Link
          :src="project.client_link"
          :title="project.client"
          addedClass="pb-2"
        />
      </div>
      <div
        v-if="project.year"
        :class="project.link ? '' : 'flex flex-col md:items-center'"
      >
        <h3 class="exerge uppercase mb-2">Date</h3>
        <p>{{ project.year }}</p>
      </div>
      <div
        v-if="project.category"
        :class="project.link ? '' : 'flex flex-col md:items-end'"
      >
        <h3 class="exerge uppercase mb-2">Category</h3>
        <p>{{ project.category }}</p>
      </div>
      <div v-if="project.link" class="flex flex-col md:items-end">
        <h3 class="exerge uppercase mb-2">Link</h3>
        <Link
          :src="project.link"
          :title="
            project.isOther
              ? 'more info'
              : project.isEvent
              ? 'see the event'
              : 'Visit Website'
          "
          arrow="true"
        />
      </div>
    </div>
    <div class="max-w-[960px] mx-auto flex flex-col items-center">
      <p class="mb-10 max-w-[700px] text-center">{{ project.description }}</p>
      <Media
        v-if="project.showCoverInPage"
        :src="'../' + project.cover"
        :title="project.title"
        addedClass="w-full object-contain"
      />
      <p v-if="project.content" class="my-10 max-w-[700px] text-center">
        {{ project.content }}
      </p>
      <div class="w-full flex flex-col items-center gap-5">
        <Media
          v-for="v in project.visuals"
          :key="v.id"
          :src="'../' + v"
          :title="project.title"
          addedClass="w-full object-contain"
        />
      </div>
      <div
        class="mt-10 w-full flex flex-col md:flex-row gap-10 justify-between"
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
        <div class="max-w-[200px] flex flex-col gap-10 md:gap-5">
          <div v-if="project.stack != []" class="flex flex-col md:items-end">
            <h3 class="exerge uppercase mb-2 md:text-right">Stack</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="stack in project.stack"
                :key="stack"
                class="border text-sm px-2 py-1 rounded"
                >{{ stack }}</span
              >
            </div>
          </div>
          <div
            v-if="project.documentation != ''"
            class="flex flex-col md:items-end"
          >
            <h3 class="exerge uppercase mb-2 md:text-right">Documentation</h3>
            <Link
              :src="project.documentation"
              :title="project.documentation_title"
              added-class="h-[28px]"
              arrow="true"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-30">
        <BigLink
          title="let's talk !"
          src="/contact"
          addedClass="max-w-max overflow-hidden"
        />
      </div>
      <Related :dedId="project.id" />
    </div>
  </div>
</template>
