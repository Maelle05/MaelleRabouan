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
    return "teaser";
  } else {
    return "image";
  }
}

console.log("addedClass prop:", props.addedClass);
</script>

<template>
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
  <h3
    v-if="getMediaType(src) == 'teaser'"
    class="mt-10 exerge uppercase text-2xl text-center"
  >
    Teaser
  </h3>
  <p v-if="getMediaType(src) == 'teaser'" class="mb-5 text-center">
    Curious? let me show you more
  </p>
  <video
    v-if="getMediaType(src) == 'teaser'"
    :src="src"
    :alt="title"
    :class="addedClass"
    preload="auto"
    controls
  ></video>
</template>
