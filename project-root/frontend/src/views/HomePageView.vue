<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-center">Dobrodošli u Brew Mastery</h1>
      <!-- Log In i Registruj se dugmad -->
      <div v-if="isGuest" class="ml-auto">
        <router-link to="/login" class="btn btn-primary"
          >Prijavi se</router-link
        >
        <router-link to="/register" class="btn btn-secondary ml-3">
          Registruj se
        </router-link>
      </div>
      <div v-else class="ml-auto">
        <button @click="logout" class="btn btn-danger">Odjavi se</button>
      </div>
    </div>

    <!-- Prikaz poruka za korisnika ili admina -->
    <p v-if="isGuest" class="alert alert-warning">
      Pregledate kao gost. Molimo vas da se prijavite ili registrujete kako
      biste kreirali narudžbine.
    </p>
    <p v-if="isUser" class="alert alert-info">
      Dobrodošli nazad, {{ user.username }}! Možete pregledati i kreirati
      narudžbine.
    </p>
    <p v-if="isAdmin" class="alert alert-admin">
      Dobrodošli nazad, Admine! Imate pun pristup za upravljanje korisnicima i
      sadržajem.
    </p>

    <!-- Prikaz kartica -->
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="option in filteredOptions"
        :key="option.link"
      >
        <div class="card h-100 text-center">
          <!-- Prikaz slike samo ako opcija ima definisanu sliku -->
          <img
            v-if="option.image"
            :src="getImage(option.image)"
            :alt="option.name"
            class="card-img-top"
            style="height: 120px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ option.name }}</h5>
            <router-link :to="option.link" class="btn btn-primary w-100">
              {{ option.buttonText }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageView",
  data() {
    return {
      user: null,
      options: [
        {
          name: "Pogledaj kategorije",
          link: "/categories",
          image: "pogledaj-kategorije",
          buttonText: "Pogledaj kategorije",
        },
        {
          name: "Pogledaj kafe",
          link: "/coffees",
          image: "pogledaj-kafe",
          buttonText: "Pogledaj kafe",
        },
        {
          name: "Kreiraj narudžbinu",
          link: "/create-order",
          image: "kreiraj-narudzbinu",
          buttonText: "Kreiraj narudžbinu",
          userOnly: true, // Prikaz samo za korisnike
        },
        {
          name: "Moje narudžbine",
          link: "/orders",
          image: "moje-narudzbine",
          buttonText: "Moje narudžbine",
          userOnly: true, // Prikaz samo za korisnike
        },
        {
          name: "Pogledaj dodatke",
          link: "/addons",
          image: "pogledaj-dodatke",
          buttonText: "Pogledaj dodatke",
        },
        {
          name: "Pogledaj recenzije",
          link: "/reviews",
          image: "pogledaj-recenzije",
          buttonText: "Pogledaj recenzije",
        },
        {
          name: "Pogledaj promocije",
          link: "/promotions",
          image: "pogledaj-promocije",
          buttonText: "Pogledaj promocije",
        },
        {
          name: "Upravljaj dodacima",
          link: "/manage-addons",
          image: null,
          buttonText: "Upravljaj dodacima",
          adminOnly: true, // Prikaz samo za admina
        },
        {
          name: "Upravljaj recenzijama",
          link: "/manage-reviews",
          image: null,
          buttonText: "Upravljaj recenzijama",
          adminOnly: true, // Prikaz samo za admina
        },
        {
          name: "Upravljaj promocijama",
          link: "/manage-promotions",
          image: null,
          buttonText: "Upravljaj promocijama",
          adminOnly: true, // Prikaz samo za admina
        },
        {
          name: "Upravljaj svim narudžbinama",
          link: "/admin-orders",
          image: null,
          buttonText: "Upravljaj narudžbinama",
          adminOnly: true, // Prikaz samo za admina
        },
      ],
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
    filteredOptions() {
      return this.options.filter((option) => {
        if (option.adminOnly && !this.isAdmin) {
          return false;
        }
        if (option.userOnly && !this.isUser) {
          return false;
        }
        return true;
      });
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
    getImage(option) {
      try {
        return require(`@/assets/home/${option}.webp`);
      } catch (e) {
        return null; // Ako slika ne postoji, ne prikazujemo ništa
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}

.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
}

.card-title {
  color: #3e2723;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.alert-info {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #0c5460;
}

.alert-admin {
  background-color: #6d4c41;
  border-color: #5d4037;
  color: #f9f6f2;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}

.btn-danger {
  background-color: #856404;
}

.card-img-top {
  border-bottom: 1px solid #d7ccc8;
}
</style>
