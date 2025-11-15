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

console.log(props.src.value);
</script>

<template>
  <a
    :href="src"
    :class="[
      addedClass,
      !src
        ? 'after:opacity-0 cursor-default pointer-events-none'
        : 'after:opacity-100',
    ]"
    target="_blank"
    class="relative max-w-max pb-1 after:absolute after:left-0 after:bottom-[4px] after:h-[1.5px] after:bg-black after:w-full md:after:w-0 after:transition-all after:duration-300 hover:after:w-full"
  >
    {{ title }}
  </a>
</template>
