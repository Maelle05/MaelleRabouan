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
        Hi, I’m Maëlle, a French developer with a creative spirit.
        <br />
        <br />
        I love crafting projects, digital experiences where new technology and visuals come together. I’m also
        driven by a deep desire to learn, explore, and experiment!
        <br />
        <br />
      </p>
      <Btn
        title="Take a look at my resume"
        isBlank
        src="https://drive.google.com/file/d/1z-qpQDBAleWPy2hkbqkvYLlxng199jmZ/view?usp=sharing"
      />
    </div>
  </div>
</template>
