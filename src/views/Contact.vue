<script setup>
import Link from "../components/Link.vue";
</script>

<template>
  <div class="p-6 flex flex-col md:flex-row gap-10">
    <div class="flex-1">
      <img
        class="w-[100%] md:w-[70%] max-w-[400px] object-contain mx-auto sticky top-30"
        src="/assets/moi-2.jpeg"
      />
    </div>
    <div class="flex-1 flex flex-col mt-5 md:mt-30">
      <p class="">
        Hi, I’m Maëlle, a French creative developer.
        <br />
        <br />
        I love crafting digital experiences where code, visuals, and emotion
        come together to tell stories and spark curiosity. I’m also driven by a
        deep desire to learn, explore, and experiment!
        <br />
        <br />
        Persevering, dynamic, and motivated, with three years of experience in
        the culture and immersive sector, I am always open to creative and
        innovative projects.
        <br />
        <br />
        And, I just came back from a long journey across Latin America, which
        truly shaped the way I create. It taught me to stay curious and
        open-minded. Qualities I now try to bring into every project, from
        experimental concepts to more crafted interactive pieces.
      </p>
      <div
        class="p-6 mt-20 mb-10 md:mb-30 flex flex-col justify-center items-center"
      >
        <h1 class="exerge text-2xl">I’d love to hear from you.</h1>
        <p class="">
          Would you like to collaborate, just discuss, or create something
          unique together?
        </p>
        <h2 class="uppercase mt-10 mb-2 exerge">Email</h2>
        <Link
          title="maelle.rabouan@gmail.com"
          src="mailto:maelle.rabouan@gmail.com"
        />
        <h2 class="uppercase mt-5 mb-2 exerge">Follow Me</h2>
        <div
          class="flex flex-col justify-center items-center md:flex-row gap-5"
        >
          <Link
            title="LinkedIn"
            src="https://www.linkedin.com/in/ma%C3%ABlle-rabouan-4b0776194/"
          />
          <Link title="Twitter" src="https://x.com/maelle_rabouan" />
        </div>
      </div>
    </div>
  </div>
</template>
