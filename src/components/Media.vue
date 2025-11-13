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

function getMediaType(src) {
  if (src.includes("videos")) {
    return "video";
  } else if (src.includes("teasers")) {
    return "teasers";
  } else {
    return "image";
  }
}
</script>

<template>
  <div class="overflow-hidden">
    <img
      v-if="getMediaType(src) == 'image'"
      :src="src"
      :alt="title"
      :class="addedClass"
    />
    <video
      v-if="getMediaType(src) == 'video'"
      :src="src"
      :alt="title"
      muted
      autoplay
      loop
      playsinline
      :class="addedClass"
    ></video>
    <video
      v-if="getMediaType(src) == 'teaser'"
      :src="src"
      :alt="title"
      :class="addedClass"
    ></video>
  </div>
</template>
