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
  <p class="mb-1">Filter by :</p>
  <div class="flex flex-wrap gap-2 max-w-[600px]">
    <button
      @click="selectTag(null)"
      class="px-3 py-1 text-sm rounded-full border transition-colors duration-200 cursor-pointer"
      :class="[
        modelValue === null
          ? 'bg-black text-white border-black'
          : 'bg-transparent border-black text-black hover:bg-black hover:text-white',
      ]"
    >
      All
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      @click="selectTag(tag)"
      class="px-3 py-1 text-sm rounded-full border transition-colors duration-200 cursor-pointer"
      :class="[
        modelValue === tag
          ? 'bg-black text-white border-black'
          : 'bg-transparent border-black text-black hover:bg-black hover:text-white',
      ]"
    >
      {{ tag }}
    </button>
  </div>
</template>
