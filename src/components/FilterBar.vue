<script setup>
const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

function selectTag(tag) {
  emit("update:modelValue", props.modelValue === tag ? null : tag);
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tag in tags"
      :key="tag"
      @click="selectTag(tag)"
      class="px-3 py-1 text-sm rounded-full border transition-colors duration-200"
      :class="[
        modelValue === tag
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'bg-white dark:bg-gray-900 border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800',
      ]"
    >
      {{ tag }}
    </button>
  </div>
</template>
