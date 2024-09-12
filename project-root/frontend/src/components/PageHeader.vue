<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/logo.png" alt="Brew Mastery Logo" class="logo" />
      </router-link>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li v-if="!isGuest" class="nav-item">
            <button @click="logout" class="btn btn-danger">Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isGuest() {
      return !this.user;
    },
  },
  mounted() {
    const token = this.getCookie("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.user = payload;
    }
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    logout() {
      document.cookie = "token=; Max-Age=0; path=/";
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.logo {
  width: 100px;
  height: auto;
}

.navbar {
  padding: 10px 20px;
}

.nav-item {
  margin-left: 15px;
}
</style>
