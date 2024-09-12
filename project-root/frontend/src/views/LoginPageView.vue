<template>
  <div class="login-container">
    <h1 class="mb-4 text-center">Prijava</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Korisničko ime</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Lozinka</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-3">
        Prijavi se
      </button>
      <button @click="continueAsGuest" class="btn btn-secondary w-100">
        Nastavi kao gost
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPageView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            document.cookie = `token=${data.token}; path=/`;
            this.$router.push("/");
          } else {
            alert("Pogrešno korisničko ime ili lozinka");
          }
        })
        .catch((error) => console.error("Greška:", error));
    },
    continueAsGuest() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f6f2;
}

h1 {
  color: #3e2723;
}

.form-label {
  color: #5d4037;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}

.btn-secondary {
  background-color: #d7ccc8;
  color: #3e2723;
}
</style>
