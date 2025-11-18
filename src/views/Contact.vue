<script setup>
import Link from "../components/Link.vue";
</script>

<template>
  <div
    class="p-6 flex flex-col justify-center items-center h-[calc(100vh-150px)]"
  >
    <h1 class="exerge text-3xl text-center">I’d love to hear from you.</h1>
    <p class="text-center">
      Would you like to collaborate, just discuss, or create something unique
      together?
    </p>
    <h2 class="uppercase mt-10 exerge">Email</h2>
    <Link
      title="maelle.rabouan@gmail.com"
      src="mailto:maelle.rabouan@gmail.com"
    />
    <h2 class="uppercase mt-5 exerge">Follow Me</h2>
    <div class="flex flex-col justify-center items-center md:flex-row gap-5">
      <Link
        title="LinkedIn"
        src="https://www.linkedin.com/in/ma%C3%ABlle-rabouan-4b0776194/"
      />
      <Link title="Twitter" src="https://x.com/maelle_rabouan" />
    </div>
  </div>
</template>
