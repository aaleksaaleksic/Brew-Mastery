<template>
  <div>
    <h1>Welcome to Brew Mastery</h1>

    <!-- Prikaz poruka za različite korisničke role -->
    <p v-if="isGuest">
      You are browsing as a guest. Please login to make orders.
    </p>
    <p v-if="isUser">
      Welcome back, {{ user.username }}! You can browse and place orders.
    </p>
    <p v-if="isAdmin">
      Welcome back, Admin! You have full access to manage users and content.
    </p>

    <!-- Linkovi ka različitim stranicama -->
    <ul>
      <li>
        <router-link to="/categories">View Categories</router-link>
      </li>
      <li v-if="isUser">
        <router-link to="/create-order">Create Order</router-link>
      </li>
      <li v-if="isUser">
        <router-link to="/orders">My Orders</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin-orders">Manage All Orders</router-link>
      </li>
      <li>
        <router-link to="/addons">View Add-Ons</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/manage-addons">Manage Add-Ons</router-link>
      </li>
      <li>
        <router-link to="/reviews">View Reviews</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/manage-reviews">Manage Reviews</router-link>
      </li>
      <li>
        <router-link to="/promotions">View Promotions</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/manage-promotions">Manage Promotions</router-link>
      </li>
    </ul>

    <!-- Dugme za Login/Logout -->
    <div v-if="isGuest">
      <router-link to="/login" class="btn btn-primary">Log in</router-link>
    </div>
    <div v-else>
      <button @click="logout" class="btn btn-danger">Log out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      user: null, // Podaci o korisniku se dobijaju iz tokena
    };
  },
  computed: {
    isGuest() {
      return !this.user; // Provera da li je gost
    },
    isUser() {
      return this.user && !this.user.admin; // Provera da li je običan korisnik
    },
    isAdmin() {
      return this.user && this.user.admin; // Provera da li je admin
    },
  },
  mounted() {
    const token = this.getCookie("token"); // Dohvatanje tokena iz kolačića
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Parsiranje JWT payload-a
      this.user = payload; // Postavljanje korisničkih podataka
    }
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    logout() {
      // Brisanje tokena iz kolačića i preusmeravanje na login stranicu
      document.cookie = "token=; Max-Age=0; path=/";
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
