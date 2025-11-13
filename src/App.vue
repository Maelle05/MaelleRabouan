<template>
  <div class="bg-[#f5f5f5] text-black flex flex-col min-h-screen">
    <!-- Navbar -->
    <header class="relative p-4 flex justify-between items-center">
      <router-link
        to="/"
        class="logo text-xl font-bold tracking-tight hover:text-gray-700 transition-colors"
        @click="menuOpen = false"
      >
        MR
      </router-link>

      <!-- Desktop nav -->
      <nav class="hidden md:flex gap-6">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="relative hover:text-gray-900 transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          :class="isActive(link.path) ? 'after:w-full' : 'after:w-0'"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Hamburger button -->
      <button
        @click="toggleMenu"
        class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
      >
        <span
          :class="menuOpen ? 'rotate-45 translate-y-1' : ''"
          class="block w-8 h-0.5 bg-black transition-all duration-300"
        ></span>
        <span
          :class="menuOpen ? 'opacity-0' : ''"
          class="block w-8 h-0.5 bg-black transition-all duration-300"
        ></span>
        <span
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
          class="block w-8 h-0.5 bg-black transition-all duration-300"
        ></span>
      </button>

      <!-- Mobile menu -->
      <Transition name="fade-stagger">
        <div
          v-if="menuOpen"
          class="absolute top-full h-[calc(100vh-64px)] left-0 w-full bg-white/95 md:hidden flex flex-col items-center justify-around py-20 z-10"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="menuOpen = false"
            class="relative font-semibold text-xl after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black"
            :class="isActive(link.path) ? 'font-bold after:w-full' : ''"
          >
            {{ link.name }}
          </router-link>
        </div>
      </Transition>
    </header>

    <main class="flex-1 p-6">
      <Transition name="page">
        <router-view />
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="py-4 text-center text-sm text-gray-500">
      © {{ new Date().getFullYear() }} Maëlle Rabouan — All rights reserved
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const isActive = (path) => route.path === path;
const menuOpen = ref(false);

const navLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Lab", path: "/lab" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<style>
/* Transition menu mobile */
.fade-stagger-enter-from,
.fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
.fade-stagger-enter-to,
.fade-stagger-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-stagger-enter-active {
  transition: all 0.3s ease;
}
.fade-stagger-leave-active {
  transition: 0.1s ease;
}

/* Transition menu page */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
