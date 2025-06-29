<script setup lang="ts">
  import FrontPage from './components/frontpage.vue';
  import HeaderMenu from './components/HeaderMenu.vue';
  import Settings from './components/Settings.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <HeaderMenu />
    </div>
  </header>

  <main class="main">
    <FrontPage />
    <Settings />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
}
</style>
