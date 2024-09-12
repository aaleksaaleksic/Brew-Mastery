<template>
  <div class="container text-center mt-5">
    <h1 class="mb-4">Dobrodošli u Brew Mastery</h1>

    <p v-if="isGuest" class="alert alert-warning">
      Pregledavate kao gost. Molimo vas da se prijavite kako biste kreirali
      narudžbine.
    </p>
    <p v-if="isUser" class="alert alert-info">
      Dobrodošli nazad, {{ user.username }}! Možete pregledati i kreirati
      narudžbine.
    </p>
    <p v-if="isAdmin" class="alert alert-success">
      Dobrodošli nazad, Admine! Imate pun pristup za upravljanje korisnicima i
      sadržajem.
    </p>

    <ul class="list-group">
      <li class="list-group-item">
        <router-link to="/categories">Pogledaj kategorije</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/coffees">Pogledaj kafe</router-link>
      </li>
      <li v-if="isUser" class="list-group-item">
        <router-link to="/create-order">Kreiraj narudžbinu</router-link>
      </li>
      <li v-if="isUser" class="list-group-item">
        <router-link to="/orders">Moje narudžbine</router-link>
      </li>
      <li v-if="isAdmin" class="list-group-item">
        <router-link to="/admin-orders"
          >Upravljaj svim narudžbinama</router-link
        >
      </li>
      <li class="list-group-item">
        <router-link to="/addons">Pogledaj dodatke</router-link>
      </li>
      <li v-if="isAdmin" class="list-group-item">
        <router-link to="/manage-addons">Upravljaj dodacima</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/reviews">Pogledaj recenzije</router-link>
      </li>
      <li v-if="isAdmin" class="list-group-item">
        <router-link to="/manage-reviews">Upravljaj recenzijama</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/promotions">Pogledaj promocije</router-link>
      </li>
      <li v-if="isAdmin" class="list-group-item">
        <router-link to="/manage-promotions">Upravljaj promocijama</router-link>
      </li>
    </ul>

    <div v-if="isGuest" class="mt-4">
      <router-link to="/login" class="btn btn-primary">Prijavi se</router-link>
    </div>
    <div v-else class="mt-4">
      <button @click="logout" class="btn btn-danger">Odjavi se</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageView",
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isGuest() {
      return !this.user;
    },
    isUser() {
      return this.user && !this.user.admin;
    },
    isAdmin() {
      return this.user && this.user.admin;
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
.container {
  max-width: 600px;
  margin: 0 auto;
}

.list-group-item {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
  color: #5d4037;
}

h1 {
  color: #3e2723;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.alert-info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}

.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}

.btn-danger {
  background-color: #d32f2f;
}
</style>
