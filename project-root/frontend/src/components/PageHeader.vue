<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-coffee">
    <div class="container-fluid">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/logo.png" alt="Brew Mastery Logo" class="logo" />
      </router-link>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Početna</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/coffees" class="nav-link">Kafe</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/reviews" class="nav-link">Recenzije</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/promotions" class="nav-link">Akcije</router-link>
          </li>
          <li v-if="!isGuest" class="nav-item">
            <button @click="logout" class="btn btn-logout ml-3">
              Odjavi se
            </button>
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
/* Coffee-inspired background color */
.bg-coffee {
  background-color: #6d4c41; /* Tamno braon boja inspirisana kafom */
}

.navbar {
  padding: 10px 20px;
}

.logo {
  width: 120px;
  height: auto;
}

.nav-link {
  color: #f9f6f2; /* Svetla boja za linkove */
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #d7ccc8; /* Svetlija nijansa braon za hover */
}

.nav-item {
  margin-left: 15px;
}

.btn-logout {
  background-color: #d32f2f;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 8px 12px;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background-color: #b71c1c;
}
</style>
