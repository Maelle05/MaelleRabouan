<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col"
  >
    <!-- Navbar -->
    <header
      class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800"
    >
      <router-link
        to="/"
        class="text-xl font-bold tracking-tight hover:text-indigo-500 transition-colors"
      >
        Maëlle Rabouan
      </router-link>

      <nav class="flex gap-4">
        <router-link
          to="/"
          class="hover:text-indigo-500 transition-colors"
          active-class="text-indigo-600 font-medium"
        >
          Projets
        </router-link>
        <!-- Exemple : ajoute ici d'autres liens si besoin -->
        <!-- <router-link to="/about" class="hover:text-indigo-500 transition-colors" active-class="text-indigo-600 font-medium">À propos</router-link> -->
      </nav>
    </header>

    <main class="flex-1 p-6">
      <router-view />
    </main>

    <!-- Footer -->
    <footer
      class="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-500"
    >
      © {{ new Date().getFullYear() }} Maëlle Rabouan — Tous droits réservés
    </footer>
  </div>
</template>

<script setup>
// Rien de spécial ici pour l’instant, mais tu pourrais ajouter
// des logiques globales plus tard (ex : thème clair/sombre)
</script>

<style>
/* Optionnel : pour de meilleures transitions entre pages */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
