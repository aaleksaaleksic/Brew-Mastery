<template>
  <div id="app">
    <!-- Uključujemo Header na vrh svake stranice -->
    <PageHeader />

    <!-- Ostatak aplikacije -->
    <router-view />
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";

export default {
  name: "App",
  components: {
    PageHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
