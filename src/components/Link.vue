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
    required: false,
  },
  arrow: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <a
    :href="src"
    :class="[
      addedClass,
      !src
        ? 'after:opacity-0 cursor-default pointer-events-none'
        : 'after:opacity-100',
      arrow
        ? 'before:absolute before:border-t-3 before:border-t-transparent before:border-b-3 before:border-b-transparent before:border-l-6 before:border-l-black before:w-0 before:h-0 before:right-[0%] before:mt-[9px] before:translate-x-[12px]'
        : '',
    ]"
    target="_blank"
    class="relative max-w-max pb-1 after:absolute after:left-0 after:bottom-[4px] after:h-[1.5px] after:bg-black after:w-full md:after:w-0 after:transition-all after:duration-300 hover:after:w-full"
  >
    {{ title }}
  </a>
</template>
