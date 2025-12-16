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
  isBlank: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div
    class="mx-auto w-max mt-20 relative transition-all duration-300 hover:scale-102"
  >
    <router-link
      v-if="!isBlank"
      :to="src"
      :class="addedClass"
      class="border px-5 py-3 border-[1.2px]"
    >
      {{ title }}
    </router-link>
    <a
      v-else
      :href="src"
      target="_blank"
      rel=""
      :class="addedClass"
      class="border px-5 py-3 border-[1.2px]"
      >{{ title }}</a
    >
  </div>
</template>
