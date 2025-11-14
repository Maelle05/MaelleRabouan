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
    <h3
      v-if="getMediaType(src) == 'teaser'"
      class="mt-10 mb-5 exerge uppercase text-2xl text-center"
    >
      Teaser
    </h3>
    <video
      v-if="getMediaType(src) == 'teaser'"
      :src="src"
      :alt="title"
      :class="addedClass"
      controls
    ></video>
  </div>
</template>
