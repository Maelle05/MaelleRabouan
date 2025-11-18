<script setup>
import BigLink from "@/components/BigLink.vue";
</script>

<template>
  <div class="p-6 flex flex-col md:flex-row gap-10">
    <div class="flex-1 flex justify-center">
      <img class="md:w-[70%] object-contain" src="../assets/moi-2.jpeg" />
    </div>
    <div class="flex-1 flex flex-col justify-center">
      <p class="">
        Hi, I’m Maëlle, a French creative developer.
        <br />
        <br />
        I love crafting digital experiences where code, visuals, and emotion
        come together to tell stories and spark curiosity. ✨ I’m also driven by
        a deep desire to learn, explore, and experiment!
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
        experimental concepts to more crafted interactive pieces. 🖌️
      </p>
      <div class="flex justify-center mt-15">
        <BigLink
          title="let's talk !"
          src="/contact"
          addedClass="max-w-max overflow-hidden"
        />
      </div>
    </div>
  </div>
</template>
