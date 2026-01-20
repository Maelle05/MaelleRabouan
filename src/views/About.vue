<script setup>
import Btn from "@/components/Btn.vue";
</script>

<template>
  <div class="p-6 flex flex-col md:flex-row gap-10">
    <div class="flex-1 flex justify-center">
      <img
        class="w-[100%] md:w-[70%] max-w-[400px] object-contain"
        src="/assets/moi-2.jpeg"
      />
    </div>
    <div class="flex-1 flex flex-col justify-center">
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
      <Btn
        title="Take a look at my resume"
        isBlank
        src="https://drive.google.com/file/d/1SqqBfAh9d-eumrNmLvdB0p_shNorufNY/view?usp=drive_link"
      />
    </div>
  </div>
</template>
