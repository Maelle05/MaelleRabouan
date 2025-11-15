<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  addedClass: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <router-link
    :to="src"
    :class="addedClass"
    class="group relative overflow-hidden before:transition-all before:duration-300 before:w-full md:before:w-0 before:h-[2px] before:absolute before:bottom-0 before:bg-black hover:before:w-full"
  >
    <p
      class="block text-3xl exerge text-center font-bold transition-transform duration-300 group-hover:-translate-y-full"
    >
      {{ title }}
    </p>
    <p
      class="absolute text-3xl exerge text-center font-bold left-0 top-full transition-transform duration-300 group-hover:-translate-y-full"
    >
      {{ title }}
    </p>
  </router-link>
</template>
